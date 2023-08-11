
// Updater pour la carte du donjon 
function updateView(donjon,joueur) {
    let table = document.getElementById('table');
    table.innerHTML='';    

    for (let i = 0; i < donjon.length; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < donjon[0].length; j++) {
            let cell = document.createElement('td');
            
            if(donjon[i][j] == "▣"){cell.style.backgroundColor='black';cell.textContent = donjon[i][j];}  // ☰  ♦  ▣
            else if(donjon[i][j] == "J"){ 
                let backgroundUrl="";
                
                switch (joueur.statut)  
                           
                {
                    
                    case 'haut':
                    {
                        backgroundUrl = "url('./img/KnightFt.png')"
                        break;

                    }                        
                    case 'bas':
                    {
                        backgroundUrl = "url('./img/KnightBt.png')"
                        break;

                    }  
                    case 'droit':
                    {
                        backgroundUrl = "url('./img/KnightRt.png')"
                        break;

                    } 
                    case 'gauche':
                    {
                        backgroundUrl = "url('./img/KnightLt.png')"
                        break;

                    }  
                                
                }
                cell.style.backgroundImage = backgroundUrl;                 
                                  
            }
            else if(donjon[i][j]=='O1')cell.style.backgroundImage="url('./img/mo1.png')";
            else if(donjon[i][j]=='O2')cell.style.backgroundImage="url('./img/mo2.gif')";
            else if(donjon[i][j]=='O3')cell.style.backgroundImage="url('./img/mo3.gif')";
            else if(donjon[i][j]=='T1')cell.style.backgroundImage="url('./img/t1.png')";
            else if(donjon[i][j]=='T2')cell.style.backgroundImage="url('./img/t2.png')";
            else if(donjon[i][j]=='T3')cell.style.backgroundImage="url('./img/t3.png')";
            else if(donjon[i][j]=='P1')cell.style.backgroundImage="url('./img/p1.png')";
            else if(donjon[i][j]=='P2')cell.style.backgroundImage="url('./img/p2.png')";
            else if(donjon[i][j]=='P3')cell.style.backgroundImage="url('./img/p3.png')";
            cell.style.backgroundSize = '100% 100%';            
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    console.log(donjon);
}


// Generateur de donjons avec tous les elements
function donjonGen(rows,cols,elements){
    let nbTuile=0;
    let donjon = [];
    for(let i=0;i<rows;i++)
    {
        donjon[i]=[];
        for(let j=0;j<cols;j++){
            donjon[i][j]=undefined;
        }
    }
    let iRef = Math.floor(Math.random()*rows);
    let jRef = Math.floor(Math.random()*cols);

    donjon[iRef][jRef]="S" //la premiere tuile du sol comme reference pour les autres tuiles

    let i,j,fixe;
    let nvlTuile = false;

    while(nbTuile<((rows*cols)*1.5))
    {
        i = Math.floor(Math.random()*2); // choisir entre la tuile qui se trouve en haut ou en bas de la tuile de reference
        j = Math.floor(Math.random()*2); // choisir entre la tuile qui se trouve a guache ou a drite de la tuile de reference
        fixe = Math.floor(Math.random()*2); // pour fixer soit le i soit le j cela nous permet que la tuile suivante soit collee a la tuile precedante
        if(fixe == 0)
        {
            i=iRef;
            if(j==0 && jRef-1>=0)
            {
                j=jRef-1;     
                nvlTuile=true;           

            }
            else if(j==1 && jRef+1<cols)
            {
                j=jRef+1;
                nvlTuile=true;
                
            }
        }
        else
        {
            j=jRef;
            if(i==0 && iRef-1>=0)
            {
                i=iRef-1;
                nvlTuile=true;
                
            }
            else if(i==1 && iRef+1<rows)   
            {
                i=iRef+1;
                nvlTuile=true;
                
            }
        } 

        if(nvlTuile)
        {
            donjon[i][j]="S";
            nbTuile++;
            iRef=i;
            jRef=j;
            nvlTuile=false;
        }     
        
    }

    // Remplir les case restantes avec des murs
    for(let i = 0; i<rows; i++) 
    {
        for(let j=0;j<cols; j++)
        {
            if(donjon[i][j]!="S")donjon[i][j]="▣";
        }
    }

    // Positionner tous les elements aleatoirement dans des cases de sol differentes 
    
    for(x=0; x<elements.length; x++)
    {
        
        let posElement=false;

        while(!posElement)  
        {
            i = Math.floor(Math.random()*donjon.length); 
            j = Math.floor(Math.random()*donjon[0].length);
            if(donjon[i][j]=="S")
            {

                donjon[i][j]=elements[x].char;
                if (elements[x].char==='J') joueur.position = [i,j];
                else if(elements[x].char==='O1')elements[x].position = [i,j];
                else if(elements[x].char==='O2')elements[x].position = [i,j];
                else if(elements[x].char==='O3')elements[x].position = [i,j];                
                posElement=true;
            }    
        }    

    }  
    console.log(donjon);
    return donjon;
}

//Definition du joueur:

let joueur={
    char:'J',
    vie:100,
    position:[0,0],
    statut:'bas',

    deplacer(direction, donjon){
        let y=this.position[0];
        let x=this.position[1];
        let nvlPosition=[0,0];
        switch (direction)
        {
            case'haut':
            {
                nvlPosition=[y-1,x];                                
                this.statut = 'haut';                
                break;             

            }
            case 'bas':
            {
                nvlPosition=[y+1,x];                
                this.statut = 'bas';
                break;             

            }
            case 'gauche':
            {
                nvlPosition=[y,x-1];
                this.statut = 'gauche';
                break;             

            }
            case'droit':
            {
                nvlPosition=[y,x+1];
                this.statut = 'droit';
                break;             
            } 

        }  
        if(nvlPosition[0]<donjon.length && nvlPosition[0]>=0 && nvlPosition[1]<donjon[0].length && nvlPosition[1]>=0)
        {
            if(donjon[nvlPosition[0]][nvlPosition[1]] ==='S')
            {
                donjon[nvlPosition[0]][nvlPosition[1]]='J';
                donjon[this.position[0]][this.position[1]]='S';
                this.position = nvlPosition;
            }
            else if(donjon[nvlPosition[0]][nvlPosition[1]] ==='T1'||donjon[nvlPosition[0]][nvlPosition[1]] ==='T2'||donjon[nvlPosition[0]][nvlPosition[1]] ==='T3'
                      || donjon[nvlPosition[0]][nvlPosition[1]] ==='P1'||donjon[nvlPosition[0]][nvlPosition[1]] ==='P2'||donjon[nvlPosition[0]][nvlPosition[1]] ==='P3')
            {
                
                if(donjon[nvlPosition[0]][nvlPosition[1]] ==='T1') {score+=tresors[0].valeur; nbTresors--; }
                else if(donjon[nvlPosition[0]][nvlPosition[1]] ==='T2'){score += tresors[1].valeur; nbTresors--; }
                else if(donjon[nvlPosition[0]][nvlPosition[1]] ==='T3'){score += tresors[2].valeur; nbTresors--; }
                else if(donjon[nvlPosition[0]][nvlPosition[1]] ==='P1')joueur.vie += pouvoirs[0].power;
                else if(donjon[nvlPosition[0]][nvlPosition[1]] ==='P2')joueur.vie += pouvoirs[1].power;
                else if(donjon[nvlPosition[0]][nvlPosition[1]] ==='P3')joueur.vie += pouvoirs[2].power;

                donjon[nvlPosition[0]][nvlPosition[1]]='J';
                donjon[this.position[0]][this.position[1]]='S';
                this.position = nvlPosition;

            }
        }
        deplacerMonstres();
        updateView(donjon,joueur);
        updateInfos(score,level,joueur.vie);  
        verifierEtat();
    }
}

// Generer un nombre (nbr) de monstres soit de type O1 ou O2 ou O3
// chaque type de monstre a un pouvoir destructeur different des autres et une direction aleatoire
// soit verticale v, horizontale h ou tous les sens a

function  genMonstres(nbr)
{      
    let x=1;
    let charP, positionP,powerP,mvtP;
    let monstres =[]

    for(let i =0;i<nbr;i++)
    {
        if(x===4)x=1;

        if(x===1){
            charP = 'O1';
            positionP=[0,0];
            powerP=3;
            mvtP='h';
            x++;
        }
        else if(x===2){
            charP = 'O2';
            positionP=[0,0];
            powerP=6;
            mvtP='v'
            x++
        }
        else if(x===3){
            charP = 'O3';
            positionP=[0,0];
            powerP=9;
            mvtP='a'
            x++
        }
        monstres.push({
            char:charP,
            position:positionP,
            power:powerP,
            mvt:mvtP,
        
        })        
        
    }
    console.log("Afficher les monstres: "+monstres);
    return monstres;
}



// Definition des potions de pouvoir
let pouvoirs=[{
        char:'P1',
        position:[0,0],
        power: 5,
    },
    {
        char:'P2',
        position:[0,0],
        power: 10,
    },
    {
        char:'P3',
        position:[0,0],
        power: 15,
    }
]

// Definition des tresors

let tresors=[{
        char:'T1',
        position:[0,0],
        valeur: 5
    },
    {
        char:'T2',
        position:[0,0],
        valeur: 7
    },
    {
        char:'T3',
        position:[0,0],
        valeur: 9
    }
]

// Fonction pour deplacer les monstres
function deplacerMonstres(){
    

    for(let monstre of monstres){        
        let y = monstre.position[0];
        let x = monstre.position[1];
        let nvlPosition = undefined;
        let i=Math.floor(Math.random()*2);
        let j=Math.floor(Math.random()*4);
        if(monstre.mvt==='h') // monstre avec deplacement aleatoire horizontal
        {
            if(i===0)
            {
                nvlPosition = [y,x-1];                
            }
            else{
                nvlPosition = [y,x+1];                
            }
        }
        else if(monstre.mvt==='v')  // monstre avec deplacement aleatoire horizontal
        {
            if(i===0)
            {
                nvlPosition = [y-1,x];                
            }
            else{
                nvlPosition = [y+1,x];
            }

        }
        else if(monstre.mvt==='a')  // // monstre avec deplacement aleatoire tous les sens
        {
            if(j===0)
            {
                nvlPosition = [y,x-1];                
            }
            else if(j===1)
            {
                nvlPosition = [y,x+1];                
            }
            else if(j===2)
            {
                nvlPosition = [y-1,x];                
            }
            else
            {
                nvlPosition = [y+1,x]; 
            }
        }

        if(nvlPosition[0]<donjon.length && nvlPosition[0]>=0 && nvlPosition[1]<donjon[0].length && nvlPosition[1]>=0)
        {
            
            if(donjon[nvlPosition[0]][nvlPosition[1]]==='S')
            {
                monstre.position = nvlPosition;
                donjon[nvlPosition[0]][nvlPosition[1]]=monstre.char;
                donjon[y][x]='S';
            }
            else if(donjon[nvlPosition[0]][nvlPosition[1]]==='J')
            {
                monstre.position = nvlPosition;
                donjon[nvlPosition[0]][nvlPosition[1]]=monstre.char;
                donjon[y][x]='S';
                joueur.vie -= monstre.power;
                if(joueur.vie <= 0) joueur.vie = 0;

            }
        }

    }   
    
}



// Fonction pour utilise les cles du clavier
function presseClavier(event){
    let key = event.key;
    if (key === 'ArrowLeft') joueur.deplacer('gauche',donjon);
    else if (key === 'ArrowUp') joueur.deplacer('haut',donjon);
    else if (key === 'ArrowRight') joueur.deplacer('droit',donjon);
    else if (key === 'ArrowDown') joueur.deplacer('bas',donjon);
}

//fonctions pour mise a jour du score, niveau et vie
function updateInfos(score,level,vie){
    let scoreTxt=document.getElementById('score');
    scoreTxt.innerText=score;  
    let levelTxt= document.getElementById('level');
    levelTxt.innerText=level;  
    let vieTxt= document.getElementById('vie');
    vieTxt.innerText=vie;
}

//Afficher une boite de dialogue apres succes ou echec
function afficherDialg(msg){
    if(msg==='echec')
    {
        
        dialogBox.style.display='block';
        titreDia.innerText = 'Echec!';
        texteDia.innerText = 'Vous avez echoue la partie,\nVotre score est: '+score+', Niveau: '+level;

        
    }  
    else if(msg==='bravo')
    {
        dialogBox.style.display='block'; 
        titreDia.innerText = 'Bravo!';
        texteDia.innerText = 'Vous avez gagne la partie,\nVotre score est: '+score+', Niveau suivant est: '+level;

    }
}

// Verifier l'etat du jeu
function verifierEtat(){
    if(joueur.vie === 0)
    {
        afficherDialg('echec');
        btnContDia.value = 'Reinitialiser';
        level=1;
        joueur.vie=100;
        score =0;
        initialiserJeu();
    } 
    else if(nbTresors===0 && joueur.vie>0)  
    { 
        level++;       
        afficherDialg('bravo');  
        btnContDia.value = 'Continuer';      
        initialiserJeu();
    } 
}

function initialiserJeu(){
    monstres = genMonstres(level+2);   
    elements =[joueur];
    let fin=false
    let i =0;
    // une boucle pour remplir tous les objets de type monstre, pouvoir, tresors dans la table elements d'une facon dynamique
    // pour permettre d'augmenter le nombre des objet dans les niveaux supperieur
    while(!fin){
        fin=true;
        if(i<monstres.length){
            elements.push(monstres[i]);
            fin= false;
        }
        if(i<tresors.length){
            elements.push(tresors[i]);
            fin= false;
        }
        if(i<pouvoirs.length){
            elements.push(pouvoirs[i]);
            fin= false;
        }
        i++;
    }

    // initialisation du tableau du donjon avec les differents elements
    donjon = donjonGen(15,20,elements);
    nbTresors =tresors.length;

    //Mise a jour de l'interface graphique
    updateView(donjon,joueur);
    updateInfos(score,level,joueur.vie);

}


// Declaration des variables principales du jeu
let elements, donjon, level=1, score=0, nbTresors;
let monstres=[];


// Initialiser le jeu
initialiserJeu();



//Initialisation et recuperation des evenements des differents boutons

//les boutons de deplacements sur la page
let btnHaut = document.getElementById('fl-haut');
btnHaut.addEventListener('click',()=>{joueur.deplacer('haut',donjon)});

let btnBas = document.getElementById('fl-bas');
btnBas.addEventListener('click',()=>{joueur.deplacer('bas',donjon)});

let btnGauche = document.getElementById('fl-gauche');
btnGauche.addEventListener('click',()=>{joueur.deplacer('gauche',donjon)});

let btnDroit = document.getElementById('fl-droite');
btnDroit.addEventListener('click',()=>{joueur.deplacer('droit',donjon)});

// Un eventLestener pour le clavier
document.addEventListener('keydown',presseClavier)

// les elements de la boite de dialogue
let dialogBox = document.getElementById('boiteDia');
let btnDiagClose = document.getElementById('closeDia');
btnDiagClose.addEventListener('click',()=>{dialogBox.style.display='none'});
    // continuer ave  le jeu
let btnContDia = document.getElementById('contDia');
btnContDia.addEventListener('click',()=>{dialogBox.style.display='none'});
    // Fermer la page
let btnQuitDia = document.getElementById('quitDia');
btnQuitDia.addEventListener('click',()=>{window.close()});

let titreDia = document.getElementById('titreDia');
let texteDia = document.getElementById('texteDia');
