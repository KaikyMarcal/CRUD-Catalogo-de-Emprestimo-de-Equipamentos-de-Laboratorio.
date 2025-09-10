export default {
    template: `
        <div class="filters">
            <div class="filter-group">
                <label for="filter-category">Filtrar por Categoria:</label>
                <select 
                    id="filter-category" 
                    v-model="localFilters.category"
                    aria-label="Filtrar por categoria"
                >
                    <option value="">Todas as categorias</option>
                    <option v-for="category in categories" :value="category">{{ category }}</option>
                </select>
            </div>
            
            <div class="filter-group">
                <label for="filter-status">Filtrar por Status:</label>
                <select 
                    id="filter-status" 
                    v-model="localFilters.status"
                    aria-label="Filtrar por status"
                >
                    <option value="">Todos os status</option>
                    <option value="disponível">Disponível</option>
                    <option value="emprestado">Emprestado</option>
                </select>
            </div>
            
            <div class="filter-group">
                <button 
                    type="button" 
                    class="btn-secondary" 
                    @click="clearFilters"
                    aria-label="Limpar filtros"
                >
                    Limpar Filtros
                </button>
            </div>
        </div>
    `,
    props: {
        filters: {
            type: Object,
            required: true
        },
        categories: {
            type: Array,
            default: () => []
        }
    },
    emits: ['update-filters'],
    data() {
        return {
            localFilters: {...this.filters}
        };
    },
    watch: {
        localFilters: {
            handler(newFilters) {
                this.$emit('update-filters', newFilters);
            },
            deep: true
        },
        filters: {
            handler(newFilters) {
                this.localFilters = {...newFilters};
            },
            deep: true
        }
    },
    methods: {
        clearFilters() {
            this.localFilters = {
                category: '',
                status: ''
            };
        }
    }
};