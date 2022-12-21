import { 
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToMany,
    JoinColumn,
    OneToOne,
    ManyToOne,
    Column,
    } from 'typeorm';
import { Carrinhos_Produtos } from './CarrinhoProduto';
import { Usuario } from './Usuario';


@Entity('carrinhos')
export class Carrinho {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @Column({
        default: false
    })
    compraFinalizada: boolean;

    @ManyToOne(() => Usuario, usuario => usuario , {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @OneToMany(() => Carrinhos_Produtos, carrinho_produto => carrinho_produto.carrinho,
    {cascade: true}, ) //toda vez que criar (salvar) um carrinho todos os c_r relacionados serão salvos automaticamente
    carrinhos_produtos: Carrinhos_Produtos[]
}