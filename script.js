const wrapper = document.getElementById('wrapper')
const main = document.getElementById('main')
const createTask = document.getElementById('createTask')
const inputAdd = document.getElementById('inputAdd')
const btnAdd = document.getElementById('btnAdd')

let arr = JSON.parse(localStorage.getItem('tasks')) || [];
localStorage.setItem(`tasks`, JSON.stringify(arr))

const renderFunc = () => {

     let index = 1
     for (let item of arr) {

          const taskPanel = document.createElement(`div`)
          taskPanel.className = `task-panel`
          main.append(taskPanel)

          const count = document.createElement(`span`)
          count.className = `task-panel__number`
          count.textContent = `${index}`.padStart(2, `0`) + `.`

          const inputContainer = document.createElement(`div`)
          inputContainer.className = `task-panel__input-container`
          inputContainer.style.background = item.background
          taskPanel.append(count, inputContainer)

          const taskInput = document.createElement(`input`)
          taskInput.className = `task-panel__input`
          taskInput.value = item.value
          taskInput.disabled = item.disabled
          taskInput.type = `text`

          const taskCheckbox = document.createElement(`input`)
          taskCheckbox.className = `task-panel__checkbox`
          taskCheckbox.type = `checkbox`
          taskCheckbox.checked = item.boolStatus
          inputContainer.append(taskInput, taskCheckbox)

          const delleteBtn = document.createElement(`button`)
          delleteBtn.className = `dellete`
          delleteBtn.id = index
          delleteBtn.textContent = `dell.`
          taskPanel.append(delleteBtn)

          taskInput.addEventListener('input', () => {
               arr[+delleteBtn.id - 1].value = taskInput.value
               localStorage.setItem(`tasks`, JSON.stringify(arr))
          })

          taskCheckbox.addEventListener('change', () => {
               arr[+delleteBtn.id - 1].boolStatus = taskCheckbox.checked
               localStorage.setItem(`tasks`, JSON.stringify(arr))

               if (taskCheckbox.checked === true) {
                    arr[+delleteBtn.id - 1].background = `grey`
                    arr[+delleteBtn.id - 1].disabled = true
                    inputContainer.style.background = item.background
                    taskInput.disabled = item.disabled
                    localStorage.setItem(`tasks`, JSON.stringify(arr))
               } else {
                    arr[+delleteBtn.id - 1].background = `teal`
                    arr[+delleteBtn.id - 1].disabled = false
                    inputContainer.style.background = item.background
                    taskInput.disabled = item.disabled
                    localStorage.setItem(`tasks`, JSON.stringify(arr))
               }
          })

          delleteBtn.addEventListener('click', () => {
               arr.shift(arr[+delleteBtn.id - 1])
               localStorage.setItem(`tasks`, JSON.stringify(arr))
               location.reload()
          })

          index += 1
     }
}

renderFunc()


btnAdd.addEventListener(`click`, () => {
     arr.push({ value: inputAdd.value, boolStatus: false, background: `teal`, disabled: false })
     inputAdd.value = ``
     main.innerHTML = ``
     renderFunc()
     localStorage.setItem(`tasks`, JSON.stringify(arr))
})
