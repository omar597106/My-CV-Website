// جلب العناصر اللي هنستخدمها من HTML
const squares = document.querySelectorAll(".square"); // كل المربعات (الحفر)
const scoreDisplay = document.getElementById("score"); // شاشة عرض النتيجة
const timeLeftDisplay = document.getElementById("time-left"); // شاشة عرض الوقت
const startButton = document.getElementById("start-button"); // زرار "إبدأ"

// متغيرات اللعبة الأساسية
let result = 0; // النتيجة
let hitPosition = null; // ID بتاع المربع اللي فيه الوحش حالياً
let currentTime = 30; // وقت اللعبة بالثواني
let timerId = null; // ID بتاع مؤقت حركة الوحش (ظهور واختفاء)
let countdownTimerId = null; // ID بتاع مؤقت العد التنازلي للوقت

// 1. دالة لاختيار مربع عشوائي يظهر فيه الوحش
function randomSquare() {
  // إزالة كلاس 'up' من كل المربعات لإخفاء الوحش
  squares.forEach((square) => {
    square.classList.remove("up");
  });

  // اختيار مربع عشوائي من بين المربعات المتاحة
  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add("up"); // إضافة كلاس 'up' لإظهار الوحش في هذا المربع

  // تخزين الـ ID بتاع المربع اللي فيه الوحش حالياً
  hitPosition = randomSquare.id;
}

// 2. دالة للعد التنازلي للوقت وتحديد نهاية اللعبة
function countDown() {
  currentTime--; // إنقاص الوقت
  timeLeftDisplay.textContent = currentTime; // تحديث شاشة عرض الوقت

  // عند انتهاء الوقت
  if (currentTime <= 0) {
    clearInterval(countdownTimerId); // إيقاف مؤقت العد التنازلي
    clearInterval(timerId); // إيقاف مؤقت حركة الوحش

    // إزالة الوحش من أي مربع كان ظاهر فيه
    squares.forEach((square) => {
      square.classList.remove("up");
    });

    alert("انتهت اللعبة! نتيجتك النهائية هي: " + result);

    // إزالة مستمعي الأحداث من المربعات لمنع الضغط بعد انتهاء اللعبة
    squares.forEach((square) =>
      square.removeEventListener("mousedown", handleMoleHit)
    );

    // إعادة تفعيل زرار "إبدأ" للسماح بلعب جولة جديدة
    startButton.disabled = false;
  }
}

// 3. دالة للتعامل مع ضغط اللاعب على الوحش
function handleMoleHit(event) {
  // التحقق إذا كان المربع الذي تم الضغط عليه هو نفسه مكان الوحش الحالي
  if (event.target.id === hitPosition) {
    result++; // زيادة النتيجة بنقطة
    scoreDisplay.textContent = result; // تحديث شاشة عرض النتيجة
    hitPosition = null; // إفراغ 'hitPosition' لمنع تكرار النتيجة من ضغطة واحدة
  }
}

// 4. دالة لبدء جولة جديدة من اللعبة
function startGame() {
  // تصفير النتيجة والوقت
  result = 0;
  currentTime = 30;
  scoreDisplay.textContent = result;
  timeLeftDisplay.textContent = currentTime;

  // تعطيل زرار "إبدأ" لمنع الضغط عليه أثناء اللعب
  startButton.disabled = true;

  // التأكد من إيقاف أي مؤقتات سابقة قبل البدء
  if (timerId) clearInterval(timerId);
  if (countdownTimerId) clearInterval(countdownTimerId);

  // إزالة مستمعي الأحداث القديمة وتفعيل الجديدة (لضمان عدم تكرارها)
  squares.forEach((square) =>
    square.removeEventListener("mousedown", handleMoleHit)
  ); // إزالة القديم
  squares.forEach((square) =>
    square.addEventListener("mousedown", handleMoleHit)
  ); // إضافة الجديد

  // بدء مؤقت حركة الوحش (يظهر ويختفي كل 700 ملي ثانية)
  timerId = setInterval(randomSquare, 700); // 700ms

  // بدء مؤقت العد التنازلي للوقت (يحدث كل ثانية)
  countdownTimerId = setInterval(countDown, 1000); // 1000ms = 1s
}

// 5. ربط زرار "إبدأ" بدالة بدء اللعبة عند الضغط عليه
startButton.addEventListener("click", startGame);
