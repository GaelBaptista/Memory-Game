import { useEffect, useState } from 'react'

import * as C from './App.styles'
import logoImage from './assets/logo4.png'
import RestartIcon from'./svgs/restart.svg'


import { Button } from './components/Button'
import { InfoItem } from './components/InfoItem'
import { GridItemType } from './types/GridItemTypes'
import { GridItem } from './components/GridItem'
import {items} from './data/items'

import { formatTimeElapsed } from './helpers/formatTimeElepsade'




 

const App = () =>{

  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed]= useState<number>(0);
  const [moveCount, setMoveCounte] =useState<number>(0);
  const [showCount, setShowCount] =useState<number>(0);
  const[gridItems, setGridItems] = useState<GridItemType[]>([])



  useEffect(() => resetAndCreateGrid(), []);


  //TIMER ==========================================
useEffect (() => {
   const timer = setInterval (() => {
     if (playing) { 
      setTimeElapsed(timeElapsed + 1);}
 }, 1000);
 return () => clearInterval(timer);
   }, [playing, timeElapsed]);
                                      
  
  
  
  //GRID ABRINDO E FECHANDO      
// verificação , se os que estão abertos são iguais


useEffect(()=>{
  if(showCount === 2) {
    let opened = gridItems.filter(item => item.shown === true);
    if(opened.length === 2){

    // se eles são iguais , torna-los permanentes
    
    if(opened[0].item === opened[1].item){

        let tmpGrid = [...gridItems];

    for(let i in tmpGrid){
      if(tmpGrid[i].shown){
        tmpGrid[i].permanentShow = true;
        tmpGrid[i].shown = false;
        }
      }
      setGridItems(tmpGrid);
      setShowCount(0);
    }else {
      // se eles nao forem iguais , fecha todo mundo "shown"
    setTimeout(()=>{
      let tmpGrid = [...gridItems];
      for(let i in tmpGrid) {
        tmpGrid[i].shown = false; 
      }
      setGridItems(tmpGrid);
      setShowCount(0);
    }, 1000)
    }
    


    setMoveCounte(moveCount => moveCount + 1) ;
  }
}

}, [showCount, gridItems]);




// verificar se o jogo acabou 

useEffect (()=>{

  if(moveCount > 0 && gridItems.every(item =>item.permanentShow === true)) {
    setPlaying (false);
  }

}, [moveCount, gridItems])




const resetAndCreateGrid = ()=>{
// passo 1 - resetar o jogo 
setTimeElapsed(0);
setMoveCounte(0);
setShowCount(0);

// passo 2 - criar o grid 
  // criar grid vazio

let tmpGrid:  GridItemType[] = [];
for(let i = 0; i < (items.length * 2); i++)tmpGrid.push({
    item : null,shown: false,permanentShow: false
  });

// preencher o grid
    // primeiro for sao 2 items para ser igual no jogo 
for(let w = 0; w < 2; w++) {
      for(let i = 0; i < items.length; i++){
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null){
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        
        
        tmpGrid[pos].item = i;

      }
    }

// jogar no state 
setGridItems(tmpGrid);


// passo 3 - começar o jogo
setPlaying(true);

}

const handleItemClick = (index: number) =>{
    if(playing && index !== null && showCount< 2){
      let tmpGrid = [...gridItems];
      if(tmpGrid[index].permanentShow === false && tmpGrid[index].shown ===false) {
        tmpGrid[index].shown = true;
        setShowCount(showCount + 1) ;
      }
      setGridItems(tmpGrid);
    }
}

  return(
    <C.Container>
      <C.Info>

      <C.LogoLink href="">
        <img src={logoImage} width="200" alt="" />
      </C.LogoLink>

      <C.InfoArea>
    
            <InfoItem
              label='Tempo'
              value={formatTimeElapsed(timeElapsed)}
            />
            <InfoItem
              label='Movimentos'
              value={moveCount.toString()}
            />

      </C.InfoArea>

              <Button 
              label='Reiniciar'
              icon={RestartIcon}
              onClick={resetAndCreateGrid}
              />


      </C.Info>

      <C.GridArea>
        <C.Grid>
            {gridItems.map((item, index)=>(
                <GridItem
                  key={index}
                  item ={item}
                  onClick={()=> handleItemClick(index)}
                />
            ))}
        </C.Grid>

      </C.GridArea>

      
    </C.Container>
  )
}

export default App;