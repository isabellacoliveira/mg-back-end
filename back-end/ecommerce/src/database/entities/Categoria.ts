import {
	Column,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Produto } from './Produto'

@Entity('categorias')
export class Categoria {
	@PrimaryGeneratedColumn()
	id: number

	@Column("varchar", { unique: true })
	titulo: string
 
	@ManyToMany(() => Produto, produto => produto.categorias, { onDelete: 'CASCADE' })
	produtos: Produto[]
}
