// جلب العناصر اللي هنستخدمها من HTML
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn"); // جلب كل الأزرار

// متغيرات لتخزين حالة الآلة الحاسبة
let currentInput = ""; // الرقم الحالي اللي المستخدم بيدخله
let firstOperand = null; // أول رقم في العملية الحسابية
let operator = null; // العملية الحسابية (+, -, *, /)
let waitingForSecondOperand = false; // هل منتظرين الرقم التاني بعد ما دخلنا عملية؟

// دالة لتحديث شاشة العرض
function updateDisplay() {
  display.value = currentInput || "0"; // لو currentInput فاضي، اعرض '0'
}

// دالة لمعالجة الأرقام والنقطة العشرية
function inputDigit(digit) {
  if (waitingForSecondOperand === true) {
    currentInput = digit;
    waitingForSecondOperand = false;
  } else {
    currentInput = currentInput === "0" ? digit : currentInput + digit;
  }
  updateDisplay();
}

// دالة لمعالجة النقطة العشرية
function inputDecimal(dot) {
  // التأكد إن مفيش نقطة عشرية قبل كده في الرقم الحالي
  if (waitingForSecondOperand === true) {
    currentInput = "0.";
    waitingForSecondOperand = false;
    updateDisplay();
    return;
  }
  if (!currentInput.includes(dot)) {
    currentInput += dot;
  }
  updateDisplay();
}

// دالة لمعالجة العمليات الحسابية
function handleOperator(nextOperator) {
  const inputValue = parseFloat(currentInput); // تحويل الرقم الحالي لرقم عشري

  if (operator && waitingForSecondOperand) {
    operator = nextOperator; // لو غير العملية قبل ما يدخل الرقم التاني، نحدث العملية بس
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = operate(firstOperand, inputValue, operator);
    currentInput = `${parseFloat(result.toFixed(7))}`; // تقريب الناتج لـ 7 أرقام عشرية
    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
  updateDisplay();
}

// دالة لتنفيذ العملية الحسابية
function operate(num1, num2, op) {
  if (op === "+") return num1 + num2;
  if (op === "-") return num1 - num2;
  if (op === "*") return num1 * num2;
  if (op === "/") {
    if (num2 === 0) {
      alert("لا يمكن القسمة على صفر!");
      return "Error"; // أو أي رسالة خطأ
    }
    return num1 / num2;
  }
  return num2; // لو مفيش عملية، رجع الرقم التاني
}

// دالة لمسح كل شيء (Clear)
function clearCalculator() {
  currentInput = "0";
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
}

// دالة لمسح آخر حرف (Delete)
function deleteLastDigit() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1); // حذف آخر حرف
  } else {
    currentInput = "0"; // لو كان حرف واحد، خليه صفر
  }
  updateDisplay();
}

// إضافة Event Listeners لكل الأزرار
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const { target } = event; // العنصر اللي اتضغط عليه

    // لو الزرار مش Button، تجاهل (زي لما تضغط على div الأب)
    if (!target.matches("button")) {
      return;
    }

    if (target.classList.contains("btn-operator")) {
      if (target.dataset.action === "clear") {
        clearCalculator();
        return;
      }
      if (target.dataset.action === "delete") {
        deleteLastDigit();
        return;
      }
      handleOperator(target.textContent); // العمليات (+, -, *, /)
      return;
    }

    if (target.classList.contains("btn-number")) {
      if (target.dataset.action === "decimal") {
        inputDecimal(target.textContent);
      } else {
        inputDigit(target.textContent);
      }
      return;
    }

    if (target.classList.contains("btn-equals")) {
      handleOperator(target.textContent); // '=' بيعمل نفس وظيفة العمليات في النهاية
      return;
    }
  });
});

// تهيئة الشاشة عند تحميل الصفحة
updateDisplay();
