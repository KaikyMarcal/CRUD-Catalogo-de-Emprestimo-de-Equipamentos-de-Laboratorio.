export default {
    template: `
        <div class="equipment-list">
            <div v-if="equipments.length === 0" class="empty-list">
                <p>Nenhum equipamento cadastrado. Que tal adicionar o primeiro?</p>
            </div>
            
            <table v-else class="equipment-table" aria-label="Lista de equipamentos">
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
                                :class="['status-badge', 
                                        equipment.status === 'disponível' ? 'status-available' : 'status-borrowed']"
                                :title="equipment.status === 'disponível' ? 'Equipamento disponível' : 'Equipamento emprestado'"
                            >
                                {{ equipment.status }}
                            </span>
                        </td>
                        <td>
                            <button 
                                class="btn-secondary" 
                                @click="$emit('edit-equipment', equipment)"
                                aria-label="Editar equipamento"
                            >
                                Editar
                            </button>
                            <button 
                                class="btn-danger" 
                                @click="$emit('delete-equipment', equipment)"
                                aria-label="Remover equipamento"
                            >
                                Remover
                            </button>
                            <button 
                                :class="['toggle-status-btn', equipment.status === 'disponível' ? 'btn-primary' : 'btn-secondary']"
                                @click="$emit('toggle-status', equipment)"
                                :aria-label="equipment.status === 'disponível' ? 'Marcar como emprestado' : 'Marcar como disponível'"
                            >
                                {{ equipment.status === 'disponível' ? 'Emprestar' : 'Devolver' }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    props: {
        equipments: {
            type: Array,
            required: true
        }
    },
    emits: ['edit-equipment', 'delete-equipment', 'toggle-status']
};