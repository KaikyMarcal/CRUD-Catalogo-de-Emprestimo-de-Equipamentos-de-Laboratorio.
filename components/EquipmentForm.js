export default {
    template: `
        <form @submit.prevent="onSubmit" class="equipment-form" ref="equipmentForm">
            <div class="form-group">
                <label for="nome">Nome do Equipamento:</label>
                <input 
                    type="text" 
                    id="nome" 
                    v-model="equipment.nome" 
                    required
                    aria-required="true"
                    aria-label="Nome do equipamento"
                >
            </div>
            
            <div class="form-group">
                <label for="categoria">Categoria:</label>
                <select 
                    id="categoria" 
                    v-model="equipment.categoria" 
                    required
                    aria-required="true"
                    aria-label="Categoria do equipamento"
                >
                    <option value="">Selecione uma categoria</option>
                    <option value="Informática">Informática</option>
                    <option value="Medição">Medição</option>
                    <option value="Áudio e Vídeo">Áudio e Vídeo</option>
                    <option value="Laboratório">Laboratório</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="patrimonio">Número de Patrimônio:</label>
                <input 
                    type="text" 
                    id="patrimonio" 
                    v-model="equipment.patrimonio" 
                    required
                    aria-required="true"
                    aria-label="Número de patrimônio"
                    placeholder="Ex: UNEMAT-1234"
                >
            </div>
            
            <div class="form-group">
                <label for="status">Status:</label>
                <select 
                    id="status" 
                    v-model="equipment.status" 
                    required
                    aria-required="true"
                    aria-label="Status do equipamento"
                >
                    <option value="disponível">Disponível</option>
                    <option value="emprestado">Emprestado</option>
                </select>
            </div>
            
            <div class="form-actions">
                <button 
                    type="submit" 
                    class="btn-primary"
                    :disabled="!isFormValid"
                    :title="isFormValid ? 'Salvar equipamento' : 'Preencha todos os campos'"
                >
                    {{ isEditing ? 'Salvar' : 'Adicionar' }}
                </button>
                
                <button 
                    v-if="isEditing" 
                    type="button" 
                    class="btn-secondary" 
                    @click="$emit('cancel-edit')"
                    aria-label="Cancelar edição"
                >
                    Cancelar
                </button>
            </div>
        </form>
    `,
    props: {
        equipment: {
            type: Object,
            required: true
        },
        isEditing: {
            type: Boolean,
            default: false
        }
    },
    emits: ['save-equipment', 'cancel-edit'],
    computed: {
        // Validação simples dos campos obrigatórios
        isFormValid() {
            return this.equipment.nome.trim() !== '' && 
                   this.equipment.categoria.trim() !== '' && 
                   this.equipment.patrimonio.trim() !== '';
        }
    },
    methods: {
        onSubmit() {
            if (this.isFormValid) {
                this.$emit('save-equipment', {...this.equipment});
            }
        }
    }
};