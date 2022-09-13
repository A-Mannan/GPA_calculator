import gradingList from "./gradingList.json" assert { type: "json" };

function calculateGPA(marks) {
  return gradingList.filter(
    (grade) => grade.start <= marks && grade.end >= marks
  )[0].value;
}

function handleChange(event) {
  const numOfCourses = event.target.value;
  const CGPAdiv = document.querySelector(".cgpa-tag");
  if (CGPAdiv) CGPAdiv.remove();
  document.querySelector("#gpa-result").innerHTML = "";
  const parentDiv = document.querySelector(".input-marks-box");
  parentDiv.innerHTML = "";
  if (numOfCourses) {
    for (let courseIndex = 0; courseIndex < numOfCourses; courseIndex++) {
      let childDiv = document.createElement("div");
      childDiv.className = "input-marks";
      let input = document.createElement("input");
      input.type = "number";
      input.id = `course-${courseIndex + 1}`;
      input.required = true;
      let span = document.createElement("span");
      span.innerHTML = `Course ${courseIndex + 1} marks`;
      childDiv.appendChild(input);
      childDiv.appendChild(span);
      parentDiv.appendChild(childDiv);
    }

    let btn = document.createElement("div");
    btn.addEventListener("click", handleSubmit);
    btn.className = "btn";
    for (let i = 0; i < 4; i++) {
      btn.appendChild(document.createElement("span"));
    }
    btn.appendChild(document.createTextNode("Calculate GPA"));
    parentDiv.appendChild(btn);
  }
}

function handleSubmit() {
  const coursesGPA = [];
  const input_fields = document.querySelectorAll(".input-marks-box input");
  input_fields.forEach((input) => {
    let marks = Math.round(parseFloat(input.value));
    console.log(marks);
    coursesGPA.push(calculateGPA(marks));
  });
  const CGPA = coursesGPA.reduce((a, b) => a + b, 0) / coursesGPA.length;
  const result = document.querySelector("#gpa-result");
  result.innerText = CGPA.toFixed(2);
  const CGPAdiv = document.createElement("div")
  CGPAdiv.innerHTML = "CGPA"
  CGPAdiv.className = "cgpa-tag";
  const body = document.querySelector('body')
  body.insertBefore(CGPAdiv, body.children[1])
}

document
  .querySelector("#input-total-courses")
  .addEventListener("input", handleChange);
