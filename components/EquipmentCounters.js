export default {
    template: `
        <div class="counters">
            <div class="counter">
                <h3>Total</h3>
                <div class="number">{{ equipments.length }}</div>
            </div>
            
            <div class="counter">
                <h3>Disponíveis</h3>
                <div class="number">{{ availableCount }}</div>
            </div>
            
            <div class="counter">
                <h3>Emprestados</h3>
                <div class="number">{{ borrowedCount }}</div>
            </div>
        </div>
    `,
    props: {
        equipments: {
            type: Array,
            required: true
        }
    },
    computed: {
        availableCount() {
            return this.equipments.filter(e => e.status === 'disponível').length;
        },
        borrowedCount() {
            return this.equipments.filter(e => e.status === 'emprestado').length;
        }
    }
};