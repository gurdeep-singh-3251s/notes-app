if (localStorage.length != 0) {
  shownotes();
}
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function (e) {
  let textarea = document.getElementById("textarea");
  let addtitle = document.getElementById("titleinput");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let myobj = {
    title: addtitle.value,
    txt: textarea.value,
  };
  notesobj.push(myobj);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  textarea.value = "";
  addtitle.value = "";
  shownotes();
});
function shownotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let html = "";
  notesobj.forEach(function (element, index) {
    html += `
        <div class="card text-center notecard" style="width: 18rem; border-radius: 10px; border:2px solid black; margin: 50px;color: black; background-color: hsl(0,${
          (index + 12) * 5
        }%, ${(index + 3) * 10}%);">
            <div class="card-body">
                  <h4 class="card-title" style="font-weight:600;
                  margin:5px">${element.title}</h4>
                  <p class="card-text" id = "${index+200}" >${element.txt}</p>
                  <button id = "${index}" onclick = "deletelem(this.id)" class="btn btn-primary addbtn active" style="background-color: black; color: white; border-radius: 8px; border: 1px solid black; font-size: large; display: inline-block;align-content: right;" aria-pressed="true">Delete Note</button>
                  <button type="button" onclick = "editelem(${index+200})" class="btn btn-outline-info active" style="color: gray; background-color: violet; border-radius: 8px; border: 1px solid black; font-size: large; display: inline-block;" aria-pressed="true">Edit</button>
            </div>
        </div> 
        `;
  });
  let noteselem = document.getElementById("notes");
  if (notes != 0) {
    noteselem.innerHTML = html;
  }
}
function deletelem(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  notesobj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  shownotes();
}

let search = document.getElementById("search");
search.addEventListener("input", function (e) {
  let inputval = search.value;
  let notecard = document.getElementsByClassName("notecard");
  Array.from(notecard).forEach(function (element) {
    let cardtext = element.getElementsByTagName("p")[0].innerText;
    if (cardtext.includes(inputval)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
function editelem(index) {
  let p = document.getElementById(`${index}`);
  let notextarea = document.getElementsByClassName(index).length;
  if (notextarea == 0) {
    let html = p.innerHTML;
    p.innerHTML = `<textarea name="" id="${index+200}" class = "${index}" cols="30">${html}</textarea>`;
  }
  let dhinkchika = document.getElementById(`${index+200}`);
  dhinkchika.addEventListener('blur',function(){
    p.innerHTML = dhinkchika.value;
  })


}
