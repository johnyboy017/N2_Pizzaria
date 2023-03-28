import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import home from './views/inicio';
import order from './views/novopedido';
import product from './views/produto';
import productEdit from './views/editarproduto';
import sale from './views/vendas';
import cart from './views/carrinho';
import category from './views/categorias';
import categoryEdit from './views/editarcategorias';

export default function App() {
  return (
    <Routes></Routes>
  );
}

const Routes = createAppContainer(
  createSwitchNavigator({
    home,
    order,
    product,
    productEdit,
    sale,
    cart,
    category,
    categoryEdit
  })
);