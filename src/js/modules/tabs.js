export function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    for (const butt of tabButtons){
        butt.addEventListener('click', () => {
            const tabId = butt.dataset.tab;
            
            // Remove active class
            for (const tabButt in tabButtons ){
                tabButt.classList.remove('active');
            }
            
            for (const pane of tabPanes)
            {
                pane.classList.remove('active');
            }
            
            // Add active class to clicked tab
            butt.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    };
}

document.addEventListener('DOMContentLoaded', initTabs);