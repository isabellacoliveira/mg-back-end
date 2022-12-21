import { 
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    Column,
    OneToMany,
    OneToOne,
    } from 'typeorm';
import { Carrinho } from './Carrinho';
import { Produto } from './Produto';

export enum Role {
        Admin = 'admin',
        Cliente = 'cliente',
    }

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar")
    nome: string

    @Column("varchar")
    sobrenome: string

    @Column("varchar", { unique: true })
    email: string

    @Column("varchar")
    senha: string

    @Column({
        type: "enum",
        enum: Role, 
        default: Role.Cliente
    })
    role: Role

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @OneToMany(() => Produto, produto => produto.usuario, { onDelete: 'CASCADE'})
	produtos: Produto[]

    @OneToMany(() => Carrinho, carrinho => carrinho.usuario,
    {cascade: true}) 
    carrinhos: Carrinho[]

}