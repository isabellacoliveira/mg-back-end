import { 
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    JoinColumn,
    Column,
    ManyToOne,
    } from 'typeorm';
import { Carrinho } from './Carrinho';
import { Produto } from './Produto';



@Entity('carrinhos_produtos')
export class Carrinhos_Produtos {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    carrinho_id: number;
  
    @Column()
    produto_id: number;
  
    @Column()
    qtdProduto: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Carrinho, carrinho => carrinho.carrinhos_produtos, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'carrinho_id' })
    carrinho: Carrinho;
  
    @ManyToOne(() => Produto, produto => produto.carrinhos_produtos, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'produto_id' })
    produto: Produto;
  
  }
