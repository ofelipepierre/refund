// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expenseQuantity = document.querySelector("aside header p span")

// ─── Persistência com localStorage ──────────────────────────────────────────

function saveExpenses() {
  const items = expenseList.querySelectorAll(".expense")
  const expenses = []

  items.forEach((item) => {
    expenses.push({
      id: item.dataset.id,
      name: item.querySelector(".expense-info strong").textContent,
      category_name: item.querySelector(".expense-info span").textContent,
      category_id: item
        .querySelector("img")
        .getAttribute("src")
        .replace("img/", "")
        .replace(".svg", ""),
      amount: parseFloat(item.dataset.amount),
    })
  })

  localStorage.setItem("refund-expenses", JSON.stringify(expenses))
}

function loadExpenses() {
  const saved = localStorage.getItem("refund-expenses")
  if (!saved) return

  const expenses = JSON.parse(saved)
  expenses.forEach((exp) => {
    const rawAmount = parseFloat(exp.amount)
    renderExpenseItem(
      {
        id: exp.id,
        expense: exp.name,
        category_id: exp.category_id,
        category_name: exp.category_name,
        amount: formatCurrencyBRL(rawAmount),
        rawAmount: rawAmount,
      },
      true
    )
  })

  updateTotals()
}

// ─── Formatação ──────────────────────────────────────────────────────────────

amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "")
  value = Number(value) / 100
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

// ─── Submissão ───────────────────────────────────────────────────────────────

form.onsubmit = (event) => {
  event.preventDefault()

  const nameValue = expense.value.trim()
  const rawValue = parseFloat(
    amount.value.replace(/[^\d,]/g, "").replace(",", ".")
  )

  if (!nameValue) {
    expense.focus()
    expense.style.borderColor = "#e53e3e"
    setTimeout(() => (expense.style.borderColor = ""), 1500)
    return
  }

  if (!rawValue || rawValue <= 0) {
    amount.focus()
    amount.style.borderColor = "#e53e3e"
    setTimeout(() => (amount.style.borderColor = ""), 1500)
    return
  }

  const newExpense = {
    id: new Date().getTime(),
    expense: nameValue,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    rawAmount: rawValue,
    created_at: new Date(),
  }

  expenseAdd(newExpense)
}

// ─── Adicionar / renderizar item ─────────────────────────────────────────────

function expenseAdd(newExpense) {
  try {
    renderExpenseItem(newExpense, false)
    formClear()
    updateTotals()
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.log(error)
  }
}

function renderExpenseItem(newExpense, skipSave) {
  const expenseItem = document.createElement("li")
  expenseItem.classList.add("expense")
  expenseItem.dataset.id = newExpense.id
  expenseItem.dataset.amount = newExpense.rawAmount

  const expenseIcon = document.createElement("img")
  expenseIcon.setAttribute("src", "img/" + newExpense.category_id + ".svg")
  expenseIcon.setAttribute("alt", newExpense.category_name)

  const expenseInfo = document.createElement("div")
  expenseInfo.classList.add("expense-info")

  const expenseName = document.createElement("strong")
  expenseName.textContent = newExpense.expense

  const expenseCategory = document.createElement("span")
  expenseCategory.textContent = newExpense.category_name

  expenseInfo.append(expenseName, expenseCategory)

  const expenseAmount = document.createElement("span")
  expenseAmount.classList.add("expense-amount")
  expenseAmount.innerHTML =
    "<small>R$</small>" + newExpense.amount.toUpperCase().replace("R$", "")

  const removeIcon = document.createElement("img")
  removeIcon.classList.add("remove-icon")
  removeIcon.setAttribute("src", "img/remove.svg")
  removeIcon.setAttribute("alt", "Remover")

  expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
  expenseList.append(expenseItem)

  if (!skipSave) saveExpenses()
}

// ─── Estado vazio ─────────────────────────────────────────────────────────────

function toggleEmptyState() {
  const emptyState = document.getElementById("empty-state")
  const hasExpenses = expenseList.querySelectorAll(".expense").length > 0
  if (hasExpenses) {
    emptyState.classList.add("hidden")
  } else {
    emptyState.classList.remove("hidden")
  }
}

// ─── Totais ──────────────────────────────────────────────────────────────────

function updateTotals() {
  toggleEmptyState()
  try {
    const items = expenseList.querySelectorAll(".expense")
    expenseQuantity.textContent =
      items.length + " " + (items.length !== 1 ? "despesas" : "despesa")

    let total = 0
    items.forEach((item) => {
      total += parseFloat(item.dataset.amount) || 0
    })

    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    expensesTotal.innerHTML = ""
    expensesTotal.append(symbolBRL, total)
  } catch (error) {
    alert("Não foi possível atualizar os totais.")
    console.log(error)
  }
}

// ─── Remover item ────────────────────────────────────────────────────────────

expenseList.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-icon")) {
    const item = event.target.closest(".expense")

    item.classList.add("removing")
    setTimeout(() => {
      item.remove()
      saveExpenses()
      updateTotals()
    }, 250)
  }
})

// ─── Limpar formulário ────────────────────────────────────────────────────────

function formClear() {
  expense.value = ""
  category.value = ""
  amount.value = ""
  expense.focus()
}

// ─── Init ─────────────────────────────────────────────────────────────────────

loadExpenses()
