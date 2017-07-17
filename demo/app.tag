<app>
    <h2>Modal</h2>
    <div class="demo">
        <su-modal modal="{ modal }">
            Modal content
        </su-modal>
    </div>
    <button class="button" onclick="{ showModal }">Show modal</button>
    <button class="button" onclick="{ toggleModalClosable }">Toggle closable</button>

    <script>
        /*
		 * MODAL
		 */
        this.modal = {
            visible: true,
            heading: 'Modal heading',
            size: 'large',
            buttons: [{
                text: 'Ok',
                type: 'primary',
                icon: 'checkmark',
                action: () => this.modal.visible = false
            }, {
                text: 'Canel',
                action: () => this.modal.visible = false
            }]
        }

        this.showModal = () => {
            this.modal.visible = true
        }

        this.toggleModalClosable = () => {
            this.modal.closable = !this.modal.closable
        }
    </script>
</app>