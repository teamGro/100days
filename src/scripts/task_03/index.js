class Task_03 {
    constructor(parent) {
        this.parent = document.querySelector('.pyramid');
    }

    init() {
        let text = {
            active: 'Run',
            pause: 'Stop'
        }

        let btn = document.querySelector('#task-03-btn');
        btn.addEventListener('click', () => {
            if (this.parent.classList.contains('paused')) {
                this.parent.classList.remove('paused');
                btn.textContent = text.pause;

                return;
            }

            this.parent.classList.add('paused');
            btn.textContent = text.active;
        }
        )
    }
}


let task_03 = new Task_03();
export default task_03;