console.log("JAI SHREE RAM");

let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textAreaCont = document.querySelector(".textarea-cont");
let allPriorityColor = document.querySelectorAll(".priority-color");
let toolboxColors = document.querySelectorAll(".color");

let colors = ["lightpink", "lightblue", "lightgreen", "black"];
let modalPriorityColor = colors[colors.length - 1];

let addFlag = false;
let removeFlag = false;

let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";

let ticketsArr = JSON.parse(localStorage.getItem("ticketsArr")) || [];

for (let currentColor of toolboxColors) {
  currentColor.addEventListener("click", () => {
    let cc = currentColor.classList[0];

    let filteredtickets = ticketsArr.filter(
      (ticketObj) => ticketObj.ticketColor === cc
    );

    let allTicketContainer = document.querySelectorAll(".ticket-cont");

    for (let i = 0; i < allTicketContainer.length; i++) {
      allTicketContainer[i].remove();
    }

    filteredtickets.forEach(({ ticketColor, ticketTask, ticketId }) =>
      createTicket(ticketColor, ticketTask, ticketId)
    );
  });

  currentColor.addEventListener("dblclick", (e) => {
    let allTicketContainer = document.querySelectorAll(".ticket-cont");

    for (let i = 0; i < allTicketContainer.length; i++) {
      allTicketContainer[i].remove();
    }

    ticketsArr.forEach(({ ticketColor, ticketTask, ticketId }) =>
      createTicket(ticketColor, ticketTask, ticketId)
    );
  });
}

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
    createTicket(modalPriorityColor, textAreaCont.value);
    addFlag = false;
    setModalToDefault();
  }
});

function createTicket(ticketColor, ticketTask, ticketId) {
  let id = ticketId || shortid();
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
  <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">#${id}</div>
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
  handleColor(ticketCont);

  if (!ticketId) {
    ticketsArr.push({
      ticketColor,
      ticketTask,
      ticketId: id,
    });
    localStorage.setItem("jira_tickets", JSON.stringify(ticketsArr));
  }
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

function handleColor(ticket) {
  let ticketColor = ticket.querySelector(".ticket-color");

  ticketColor.addEventListener("click", (e) => {
    let currentTicketColor = ticketColor.classList[1];

    let currentTicketColorIdx = colors.findIndex(
      (color) => currentTicketColor === color
    );

    currentTicketColorIdx++;

    let newTicketColor = colors[currentTicketColorIdx % colors.length];

    ticketColor.classList.remove(currentTicketColor);
    ticketColor.classList.add(newTicketColor);
  });
}

function setModalToDefault() {
  modalCont.style.display = "none";
  textAreaCont.value = "";
  modalPriorityColor = colors[colors.length - 1];
  allPriorityColor.forEach((c) => {
    c.classList.remove("border");
  });

  allPriorityColor[allPriorityColor.length - 1].classList.add("border");
}
