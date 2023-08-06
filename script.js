console.log("JAI SHREE RAM");

let addBtn = document.querySelector(".add-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textAreaCont = document.querySelector(".textarea-cont");
let addFlag = false;

addBtn.addEventListener("click", (e) => {
  // Display Modal
  // Generate Ticket
  addFlag = !addFlag;

  if (addFlag) {
    modalCont.style.display = "flex";
  } else {
    modalCont.style.display = "none";
  }
});

modalCont.addEventListener("keydown", (e) => {
  if (e.key === "Shift") {
    createTicket();
    modalCont.style.display = "none";
    addFlag = false;
    textAreaCont.value = "";
  }
});

function createTicket() {
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
  <div class="ticket-color"></div>
        <div class="ticket-id">@sample_id</div>
        <div class="task-area">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. In dolores
          accusamus molestias? Ratione recusandae voluptas quam mollitia itaque!
        </div>
  `;
  mainCont.appendChild(ticketCont);
}
