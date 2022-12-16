import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Categoria } from './Categoria'
import { Usuario } from './Usuario'

@Entity('produtos')
export class Produto {
	@PrimaryGeneratedColumn()
	id: number

	@Column("varchar")
	nome: string

	@Column("varchar")
	descricao: string

	@Column("decimal", { precision: 5, scale: 2 })
	preco: number

	@Column()
	quantidade: number

	@Column("varchar")
	imagem: string

	@ManyToMany(() => Categoria, categoria => categoria.produtos, {onDelete: 'CASCADE'})
	@JoinTable({
		name: 'categoria_produto',
		joinColumn: {
			name: 'categoria_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'produto_id',
			referencedColumnName: 'id',
		},
	})
	categorias: Categoria[]

	@ManyToOne(() => Usuario, usuario => usuario.produtos, {onDelete: 'CASCADE'})
	@JoinColumn({ name: 'usuario_id' })
	usuario: Usuario
}
