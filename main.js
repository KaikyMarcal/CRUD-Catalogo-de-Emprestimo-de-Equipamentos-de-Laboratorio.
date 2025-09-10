// Componente EquipmentForm
const EquipmentForm = {
    props: ['equipment', 'isEditing'],
    template: `
        <form @submit.prevent="$emit('save-equipment', equipment)">
            <div class="form-group">
                <label for="nome">Nome do Equipamento:</label>
                <input type="text" id="nome" v-model="equipment.nome" required>
            </div>
            <div class="form-group">
                <label for="categoria">Categoria:</label>
                <select id="categoria" v-model="equipment.categoria" required>
                    <option value="">Selecione uma categoria</option>
                    <option value="Multímetro">Multímetro</option>
                    <option value="Notebook">Notebook</option>
                    <option value="Projetor">Projetor</option>
                    <option value="Outros">Outros</option>
                </select>
            </div>
            <div class="form-group">
                <label for="patrimonio">Número de Patrimônio:</label>
                <input type="text" id="patrimonio" v-model="equipment.patrimonio" required>
            </div>
            <div class="form-group">
                <label for="status">Status:</label>
                <select id="status" v-model="equipment.status">
                    <option value="disponível">Disponível</option>
                    <option value="emprestado">Emprestado</option>
                </select>
            </div>
            <button type="submit" class="btn-primary">{{ isEditing ? 'Atualizar' : 'Adicionar' }}</button>
            <button type="button" class="btn-secondary" v-if="isEditing" @click="$emit('cancel-edit')">Cancelar</button>
        </form>
    `
};

// Componente EquipmentList
const EquipmentList = {
    props: ['equipments'],
    template: `
        <div>
            <table class="equipment-table" v-if="equipments.length">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Patrimônio</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="equipment in equipments" :key="equipment.id">
                        <td>{{ equipment.nome }}</td>
                        <td>{{ equipment.categoria }}</td>
                        <td>{{ equipment.patrimonio }}</td>
                        <td>
                            <span 
                                class="status-badge" 
                                :class="equipment.status === 'disponível' ? 'status-available' : 'status-borrowed'">
                                {{ equipment.status }}
                            </span>
                        </td>
                        <td>
                            <button 
                                v-if="equipment.status === 'disponível'" 
                                class="btn-primary" 
                                @click="$emit('toggle-status', equipment)"
                                title="Emprestar este equipamento">
                                Emprestar
                            </button>
                            <button 
                                v-else 
                                class="btn-secondary" 
                                @click="$emit('toggle-status', equipment)"
                                title="Devolver este equipamento">
                                Devolver
                            </button>
                            <button class="btn-secondary" @click="$emit('edit-equipment', equipment)">Editar</button>
                            <button class="btn-danger" @click="$emit('delete-equipment', equipment)">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="empty-list" v-else>
                Nenhum equipamento encontrado.
            </div>
        </div>
    `
};

// Componente EquipmentFilters
const EquipmentFilters = {
    props: ['filters', 'categories'],
    template: `
        <div class="filters">
            <div class="filter-group">
                <label for="filter-categoria">Filtrar por Categoria:</label>
                <select id="filter-categoria" v-model="localFilters.categoria" @change="updateParentFilters">
                    <option value="">Todas as categorias</option>
                    <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="filter-status">Filtrar por Status:</label>
                <select id="filter-status" v-model="localFilters.status" @change="updateParentFilters">
                    <option value="">Todos os status</option>
                    <option value="disponível">Disponível</option>
                    <option value="emprestado">Emprestado</option>
                </select>
            </div>
        </div>
    `,
    data() {
        return {
            localFilters: {...this.filters}
        };
    },
    methods: {
        updateParentFilters() {
            this.$emit('update-filters', {...this.localFilters});
        }
    },
    watch: {
        filters: {
            handler(newFilters) {
                this.localFilters = {...newFilters};
            },
            deep: true
        }
    }
};

// Componente EquipmentCounters
const EquipmentCounters = {
    props: ['equipments'],
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
    computed: {
        availableCount() {
            return this.equipments.filter(e => e.status === 'disponível').length;
        },
        borrowedCount() {
            return this.equipments.filter(e => e.status === 'emprestado').length;
        }
    }
};

// Aplicação Vue
const { createApp } = Vue;

const app = createApp({
    components: {
        EquipmentForm,
        EquipmentList,
        EquipmentFilters,
        EquipmentCounters
    },
    data() {
        return {
            equipments: [
                { id: '1', nome: 'Notebook Dell', categoria: 'Notebook', patrimonio: 'PAT123', status: 'disponível' },
                { id: '2', nome: 'Projetor Epson', categoria: 'Projetor', patrimonio: 'PAT456', status: 'emprestado' },
                { id: '3', nome: 'Multímetro Digital', categoria: 'Multímetro', patrimonio: 'PAT789', status: 'disponível' }
            ],
            currentEquipment: this.getEmptyEquipment(),
            isEditing: false,
            filters: {
                categoria: '',
                status: ''
            },
            // Nova propriedade para controlar o scroll
            shouldScrollToForm: false
        };
    },
    computed: {
        filteredEquipments() {
            return this.equipments.filter(equipment => {
                const categoriaMatch = !this.filters.categoria || equipment.categoria === this.filters.categoria;
                const statusMatch = !this.filters.status || equipment.status === this.filters.status;
                return categoriaMatch && statusMatch;
            });
        },
        
        categories() {
            return [...new Set(this.equipments.map(e => e.categoria))];
        }
    },
    methods: {
        getEmptyEquipment() {
            return {
                id: null,
                nome: '',
                categoria: '',
                patrimonio: '',
                status: 'disponível'
            };
        },
        
        addEquipment(equipment) {
            equipment.id = Date.now().toString();
            this.equipments.push({...equipment});
            this.currentEquipment = this.getEmptyEquipment();
        },
        
        editEquipment(equipment) {
            this.currentEquipment = {...equipment};
            this.isEditing = true;
            // Ativa a flag para fazer scroll
            this.shouldScrollToForm = true;
        },
        
        updateEquipment(updatedEquipment) {
            const index = this.equipments.findIndex(e => e.id === updatedEquipment.id);
            if (index !== -1) {
                this.equipments.splice(index, 1, {...updatedEquipment});
            }
            this.cancelEdit();
        },
        
        cancelEdit() {
            this.isEditing = false;
            this.currentEquipment = this.getEmptyEquipment();
            this.shouldScrollToForm = false;
        },
        
        saveEquipment(equipment) {
            if (this.isEditing) {
                this.updateEquipment(equipment);
            } else {
                this.addEquipment(equipment);
            }
        },
        
        deleteEquipment(equipment) {
            if (confirm(`Tem certeza que deseja remover o equipamento "${equipment.nome}"?`)) {
                const index = this.equipments.findIndex(e => e.id === equipment.id);
                if (index !== -1) {
                    this.equipments.splice(index, 1);
                }
            }
        },
        
        toggleStatus(equipment) {
            equipment.status = equipment.status === 'disponível' ? 'emprestado' : 'disponível';
        },
        
        updateFilters(newFilters) {
            this.filters = {...newFilters};
        },
        
        // Novo método para fazer scroll até o formulário
        scrollToForm() {
            const formSection = this.$refs.formSection;
            if (formSection) {
                formSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Adiciona classe de destaque temporariamente
                formSection.classList.add('highlight');
                setTimeout(() => {
                    formSection.classList.remove('highlight');
                }, 2000);
                
                // Dar foco no primeiro campo do formulário
                const firstInput = formSection.querySelector('input, select');
                if (firstInput) {
                    setTimeout(() => {
                        firstInput.focus();
                    }, 500);
                }
            }
        }
    },
    mounted() {
        // Carregar dados do localStorage se existirem
        const savedEquipments = localStorage.getItem('kurumi_equipments');
        if (savedEquipments) {
            this.equipments = JSON.parse(savedEquipments);
        }
    },
    watch: {
        equipments: {
            handler(newEquipments) {
                // Salvar no localStorage sempre que a lista mudar
                localStorage.setItem('kurumi_equipments', JSON.stringify(newEquipments));
            },
            deep: true
        },
        // Observar mudanças na flag de scroll
        shouldScrollToForm(newVal) {
            if (newVal) {
                // Pequeno delay para garantir que a DOM foi atualizada
                this.$nextTick(() => {
                    this.scrollToForm();
                    // Reset da flag após o scroll
                    setTimeout(() => {
                        this.shouldScrollToForm = false;
                    }, 1000);
                });
            }
        }
    }
});

app.mount('#app');