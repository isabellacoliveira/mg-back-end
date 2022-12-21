import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Carrinhos_Produtos } from './CarrinhoProduto'
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

	@Column("decimal", { precision: 18, scale: 2 })
	preco: number

	@Column()
	quantidade: number

	@Column("varchar")
	imagem: string

	@ManyToMany(() => Categoria, categoria => categoria.produtos, {onDelete: 'CASCADE'})
	@JoinTable({
		name: 'categorias_produtos',
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

	@OneToMany(() => Carrinhos_Produtos, carrinho_produto => carrinho_produto.produto)
    carrinhos_produtos: Carrinhos_Produtos[]
}
