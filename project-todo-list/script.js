// جلب العناصر اللي هنستخدمها من HTML
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// دالة لإضافة مهمة جديدة
function addTask() {
    // 1. التأكد إن مربع الإدخال مش فاضي
    if (taskInput.value === "") {
        alert("من فضلك اكتب مهمة أولاً!");
        return; // توقف الدالة لو مربع الإدخال فاضي
    }

    // 2. إنشاء عنصر جديد (li) للمهمة
    const li = document.createElement("li");
    li.innerHTML = taskInput.value; // ضع نص المهمة داخل الـ li

    // 3. إضافة زرار الحذف (x) لكل مهمة
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-times"></i>'; // أيقونة X من Font Awesome
    deleteButton.classList.add("delete-button"); // إضافة كلاس للتصميم
    li.appendChild(deleteButton); // إضافة زرار الحذف للـ li

    // 4. إضافة المهمة الجديدة للقائمة (ul)
    taskList.appendChild(li);

    // 5. مسح مربع الإدخال بعد إضافة المهمة
    taskInput.value = "";

    // 6. حفظ البيانات في الذاكرة المحلية (Local Storage)
    saveData();
}

// دالة للتعامل مع النقر على المهام أو أزرار الحذف
taskList.addEventListener("click", function(e) {
    // لو المستخدم ضغط على الـ li نفسها (لتعليمها كمكتملة أو غير مكتملة)
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("completed"); // تبديل الكلاس "completed"
        saveData(); // حفظ التغيير
    }
    // لو المستخدم ضغط على زرار الحذف (الأيقونة أو الزرار)
    else if (e.target.classList.contains("delete-button") || e.target.parentElement.classList.contains("delete-button")) {
        let itemToRemove;
        if (e.target.classList.contains("delete-button")) {
            itemToRemove = e.target.parentElement; // زرار الحذف نفسه
        } else {
            itemToRemove = e.target.parentElement.parentElement; // الأيقونة جوه زرار الحذف
        }
        itemToRemove.remove(); // حذف عنصر الـ li بالكامل
        saveData(); // حفظ التغيير
    }
}, false);

// إضافة المهمة عند الضغط على زرار "إضافة"
addTaskButton.addEventListener("click", addTask);

// إضافة المهمة عند الضغط على مفتاح Enter في مربع الإدخال
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// دالة لحفظ قائمة المهام في الذاكرة المحلية للمتصفح (Local Storage)
// عشان المهام متتمسحش لما تقفل الصفحة
function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}

// دالة لعرض المهام المحفوظة عند فتح الصفحة
function showTask() {
    taskList.innerHTML = localStorage.getItem("data");
}

// استدعاء الدالة عند تحميل الصفحة عشان تعرض المهام المحفوظة
showTask();