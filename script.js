console.log("JAI SHREE RAM");

let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textAreaCont = document.querySelector(".textarea-cont");
let allPriorityColor = document.querySelectorAll(".priority-color");

let colors = ["lightpink", "lightblue", "lightgreen", "black"];
let modalPriorityColor = colors[colors.length - 1];

let addFlag = false;
let removeFlag = false;

let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";

allPriorityColor.forEach((colorEle, idx) => {
  colorEle.addEventListener("click", (e) => {
    allPriorityColor.forEach((c) => {
      c.classList.remove("border");
    });
    colorEle.classList.add("border");

    modalPriorityColor = colorEle.classList[0];
  });
});

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

removeBtn.addEventListener("click", (e) => {
  removeFlag = !removeFlag;
});

modalCont.addEventListener("keydown", (e) => {
  if (e.key === "Shift") {
    createTicket(modalPriorityColor, textAreaCont.value, shortid());
    modalCont.style.display = "none";
    addFlag = false;
    textAreaCont.value = "";
  }
});

function createTicket(ticketColor, ticketTask, ticketId) {
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
  <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">#${ticketId}</div>
        <div class="task-area">
         ${ticketTask}
        </div>
        <div class="ticket-lock">
        <i class="fa-solid fa-lock"></i>
      </div>
  `;
  mainCont.appendChild(ticketCont);

  handleRemoval(ticketCont);
  handleLock(ticketCont);
  handleColor(ticketCont, ticketColor);
}

function handleRemoval(ticket) {
  if (removeFlag) ticket.remove();
}

function handleLock(ticket) {
  let ticketLockEle = ticket.querySelector(".ticket-lock");
  let ticletLock = ticketLockEle.children[0];
  let ticketTaskArea = ticket.querySelector(".task-area");

  ticletLock.addEventListener("click", (e) => {
    if (ticletLock.classList.contains(lockClass)) {
      ticletLock.classList.remove(lockClass);
      ticletLock.classList.add(unlockClass);
      ticketTaskArea.setAttribute("contenteditable", "true");
    } else {
      ticletLock.classList.add(lockClass);
      ticletLock.classList.remove(unlockClass);
      ticketTaskArea.setAttribute("contenteditable", "false");
    }
  });
}

function handleColor(ticket, color) {
  let ticketColor = ticket.querySelector(".ticket-color");
  let colorIdx = colors.findIndex((c) => c === color);

  let newTicketColorIdx =
}
