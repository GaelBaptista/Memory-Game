
import { GridItemType } from '../../types/GridItemTypes';
import * as C from './styles'
import b7Svg from '../../svgs/b7.svg'
import{items} from '../../data/items'
type Props = {
  item: GridItemType,
  onClick: () => void
}

export const GridItem = ({item, onClick}: Props)=>{
  return(
    <C.Container 
      showBackground={item.permanentShow || item.shown}
      onClick={onClick}
    
    >

     
        {item.permanentShow === false && item.shown === false &&
          <C.Icon 
          src={b7Svg} 
          alt=''
          opacity={.1}
          />
          }

          {(item.permanentShow || item.shown) && item.item !== null &&
          
          <C.Icon src={items[item.item].icon}/>
          
          }
    </C.Container>
  );
}