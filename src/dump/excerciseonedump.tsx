import { FlatList, Image, ImageBackground, LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import baaghImage from '../../../../assets/img/baagh.jpg';
import sherImage from '../../../../assets/img/sher.jpg';
import billiImage from '../../../../assets/img/billi.jpg';
import kuttaImage from '../../../../assets/img/kutta.jpg';
import haathiImage from '../../../../assets/img/haathi.jpg';
import ghodaImage from '../../../../assets/img/ghoda.jpg';
import gadhaImage from '../../../../assets/img/gadha.jpg';
import bhaluImage from '../../../../assets/img/bhalu.jpg';
import cheetaImage from '../../../../assets/img/cheeta.jpg';
import gaayImage from '../../../../assets/img/gaay.jpg';
import lomdiImage from '../../../../assets/img/lomdi.jpg';
import untImage from '../../../../assets/img/unt.jpg';
import murgiImage from '../../../../assets/img/murgi.jpg';
import totaImage from '../../../../assets/img/tota.jpg';
import moreImage from '../../../../assets/img/more.jpg';
import kauvaImage from '../../../../assets/img/kauva.jpg';
import ulluImage from '../../../../assets/img/ullu.jpg';
import bulbulImage from '../../../../assets/img/bulbul.jpg';
import baazImage from '../../../../assets/img/baaz.jpg';
import hansImage from '../../../../assets/img/hans.jpg';
import kabutarImage from '../../../../assets/img/kabutar.jpg';
import battakhImage from '../../../../assets/img/battakh.jpg';
import anguthaImage from '../../../../assets/img/angutha.jpg';
import honthImage from '../../../../assets/img/honth.jpg';
import kamarImage from '../../../../assets/img/kamar.jpg';
import kohaniImage from '../../../../assets/img/kohani.jpg';
import daantImage from '../../../../assets/img/daant.jpg';
import naakImage from '../../../../assets/img/naak.jpg';
import nakhoonImage from '../../../../assets/img/nakhoon.jpg';
import gardanImage from '../../../../assets/img/gardan.jpg';
import galaImage from '../../../../assets/img/gala.jpg';
import ghutanaImage from '../../../../assets/img/ghutana.jpg';
import ungliImage from '../../../../assets/img/ungli.jpg';
import peethImage from '../../../../assets/img/peeth.jpg';
import paanvImage from '../../../../assets/img/paanv.jpg';
import banhImage from '../../../../assets/img/banh.jpg';
import mathaImage from '../../../../assets/img/matha.jpg';
import mukhImage from '../../../../assets/img/mukh.jpg';
import sharirImage from '../../../../assets/img/sharir.jpg';
import haddiImage from '../../../../assets/img/haddi.jpg';
import aankhImage from '../../../../assets/img/aankh.jpg';
import kaanImage from '../../../../assets/img/kaan.jpg';
import baalImage from '../../../../assets/img/baal.jpg';
import haathImage from '../../../../assets/img/haath.jpg';
import safedImage from '../../../../assets/img/safed.jpg';
import lalImage from '../../../../assets/img/lal.jpg';
import peelaImage from '../../../../assets/img/peela.jpg';
import neelaImage from '../../../../assets/img/neela.jpg';
import kaalaImage from '../../../../assets/img/kaala.jpg';
import bainganiImage from '../../../../assets/img/baingani.jpg';
import bhuraImage from '../../../../assets/img/bhura.jpg';
import haraImage from '../../../../assets/img/hara.jpg';
import narangiImage from '../../../../assets/img/narangi.jpg';
import gulabiImage from '../../../../assets/img/gulabi.jpg';
import dhusarImage from '../../../../assets/img/dhusar.jpg';
import januaryImage from '../../../../assets/img/January.jpg';
import februaryImage from '../../../../assets/img/February.jpg';
import marchImage from '../../../../assets/img/March.jpg';
import aprilImage from '../../../../assets/img/April.jpg';
import mayImage from '../../../../assets/img/May.jpg';
import juneImage from '../../../../assets/img/June.jpg';
import julyImage from '../../../../assets/img/July.jpg';
import augustImage from '../../../../assets/img/August.jpg';
import septemberImage from '../../../../assets/img/September.jpg';
import octoberImage from '../../../../assets/img/October.jpg';
import novemberImage from '../../../../assets/img/November.jpg';
import decemberImage from '../../../../assets/img/December.jpg';
import gulabImage from '../../../../assets/img/gulab.jpg';
import chameliImage from '../../../../assets/img/chameli.jpg';
import kamalImage from '../../../../assets/img/kamal.jpg';
import suryamukhiImage from '../../../../assets/img/suryamukhi.jpg';
import rajnigandhaImage from '../../../../assets/img/rajnigandha.jpg';
import belaImage from '../../../../assets/img/bela.jpg';
import gendaImage from '../../../../assets/img/genda.jpg';
import leelyImage from '../../../../assets/img/leely.jpg';
import juhiImage from '../../../../assets/img/juhi.jpg';
import sadabharImage from '../../../../assets/img/sadabhar.jpg';
import jaswandImage from '../../../../assets/img/jaswand.jpg';
import dahliaImage from '../../../../assets/img/dahlia.jpg';
import kelaImage from '../../../../assets/img/kela.jpg';
import sebImage from '../../../../assets/img/seb.jpg';
import anarImage from '../../../../assets/img/anar.jpg';
import angoorImage from '../../../../assets/img/angoor.jpg';
import tarboojImage from '../../../../assets/img/tarbooj.jpg';
import amrudImage from '../../../../assets/img/amrud.jpg';
import santaraImage from '../../../../assets/img/santara.jpg';
import khajurImage from '../../../../assets/img/khajur.jpg';
import papitaImage from '../../../../assets/img/papita.jpg';
import anjeerImage from '../../../../assets/img/anjeer.jpg';
import nimbuImage from '../../../../assets/img/nimbu.jpg';
import ananusImage from '../../../../assets/img/ananus.jpg';
import mosambiImage from '../../../../assets/img/mosambi.jpg';
import tamatarImage from '../../../../assets/img/tamatar.jpg';
import somwarImage from '../../../../assets/img/Somwar.jpg';
import magalwarImage from '../../../../assets/img/Magalwar.jpg';
import budhwarImage from '../../../../assets/img/Budhwar.jpg';
import guruwarImage from '../../../../assets/img/Guruwar.jpg';
import shukrawarImage from '../../../../assets/img/Shukrawar.jpg';
import shaniwarImage from '../../../../assets/img/Shaniwar.jpg';
import raviwarImage from '../../../../assets/img/Raviwar.jpg';
import sarodImage from '../../../../assets/img/Sarod.jpg';
import sitaarImage from '../../../../assets/img/Sitaar.jpg';
import shehnaiImage from '../../../../assets/img/Shehnai.jpg';
import tablaImage from '../../../../assets/img/Tabla.jpg';
import harmoniumImage from '../../../../assets/img/Harmonium.jpg';
import jhanjhImage from '../../../../assets/img/jhanjh.jpg';
import pakhawajImage from '../../../../assets/img/Pakhawaj.jpg';
import esrajImage from '../../../../assets/img/Esraj.jpg';
import veenaImage from '../../../../assets/img/Veena.jpg';
import dholakImage from '../../../../assets/img/Dholak.jpg';
import sarangiImage from '../../../../assets/img/Sarangi.jpg';
import damaruImage from '../../../../assets/img/Damaru.jpg';
import santoorImage from '../../../../assets/img/Santoor.jpg';
import aspatalImage from '../../../../assets/img/aspatal.jpg';
import bazarImage from '../../../../assets/img/bazar.jpg';
import schoolImage from '../../../../assets/img/school.jpg';
import dukanImage from '../../../../assets/img/dukan.jpg';
import mandirImage from '../../../../assets/img/mandir.jpg';
import masjidImage from '../../../../assets/img/masjid.jpg';
import girjaImage from '../../../../assets/img/girja.jpg';
import hawaiAddaImage from '../../../../assets/img/Hawai_adda.jpg';
import stationImage from '../../../../assets/img/station.jpg';
import psImage from '../../../../assets/img/ps.jpg';
import parliamentImage from '../../../../assets/img/parliament.jpg';
import familyImage from '../../../../assets/img/family.jpg';
import riverImage from '../../../../assets/img/river.jpg';
import basantImage from '../../../../assets/img/basant.jpg';
import grishmaImage from '../../../../assets/img/grishma.jpg';
import varshaImage from '../../../../assets/img/varsha.jpg';
import sharadImage from '../../../../assets/img/sharad.jpg';
import hemantImage from '../../../../assets/img/hemant.jpg';
import aanaImage from '../../../../assets/img/aana.jpg';
import jaanaImage from '../../../../assets/img/jaana.jpg';
import karnaImage from '../../../../assets/img/karna.jpg';
import khanaImage from '../../../../assets/img/khana.jpg';
import sonaImage from '../../../../assets/img/sona.jpg';
import dekhnaImage from '../../../../assets/img/dekhna.jpg';
import bolnaImage from '../../../../assets/img/bolna.jpg';
import denaImage from '../../../../assets/img/dena.jpg';
import padhnaImage from '../../../../assets/img/padhna.jpg';
import peenaImage from '../../../../assets/img/peena.jpg';
import poochnaImage from '../../../../assets/img/poochna.jpg';
import batanaImage from '../../../../assets/img/batana.jpg';
import bulanaImage from '../../../../assets/img/bulana.jpg';
import baithnaImage from '../../../../assets/img/baithna.jpg';
import sunanaImage from '../../../../assets/img/sunana.jpg';
import khelnaImage from '../../../../assets/img/khelna.jpg';
import daudnaImage from '../../../../assets/img/daudna.jpg';
import bhaagnaImage from '../../../../assets/img/bhaagna.jpg';
import shoonyaImage from '../../../../assets/img/shoonya.jpg';
import ekImage from '../../../../assets/img/ek.jpg';
import doImage from '../../../../assets/img/do.jpg';
import teenImage from '../../../../assets/img/teen.jpg';
import charImage from '../../../../assets/img/char.jpg';
import paanchImage from '../../../../assets/img/paanch.jpg';
import chhehImage from '../../../../assets/img/chheh.jpg';
import saatImage from '../../../../assets/img/saat.jpg';
import aathImage from '../../../../assets/img/aath.jpg';
import nauImage from '../../../../assets/img/nau.jpg';
import dasImage from '../../../../assets/img/das.jpg';
import gyarahImage from '../../../../assets/img/gyarah.jpg';
import baarahImage from '../../../../assets/img/baarah.jpg';
import terahImage from '../../../../assets/img/terah.jpg';
import chaudahImage from '../../../../assets/img/chaudah.jpg';
import pandrahImage from '../../../../assets/img/pandrah.jpg';
import solahImage from '../../../../assets/img/solah.jpg';
import satrahImage from '../../../../assets/img/satrah.jpg';
import atharahImage from '../../../../assets/img/atharah.jpg';
import unnesImage from '../../../../assets/img/unnes.jpg';
import beesImage from '../../../../assets/img/bees.jpg';
import ikkeesImage from '../../../../assets/img/ikkees.jpg';
import baaeesImage from '../../../../assets/img/baaees.jpg';
import taeesImage from '../../../../assets/img/taees.jpg';
import chaubeesImage from '../../../../assets/img/chaubees.jpg';
import pacheesImage from '../../../../assets/img/pachees.jpg';
import chabeesImage from '../../../../assets/img/chabees.jpg';
import sattaeesImage from '../../../../assets/img/sattaees.jpg';
import athaeesImage from '../../../../assets/img/athaees.jpg';
import unteesImage from '../../../../assets/img/untees.jpg';
import teesImage from '../../../../assets/img/tees.jpg';
import ekteesImage from '../../../../assets/img/ektees.jpg';
import batteesImage from '../../../../assets/img/battees.jpg';
import taiteesImage from '../../../../assets/img/taitees.jpg';
import chauteesImage from '../../../../assets/img/chautees.jpg';
import paiteesImage from '../../../../assets/img/paitees.jpg';
import chateesImage from '../../../../assets/img/chatees.jpg';
import saiteesImage from '../../../../assets/img/saitees.jpg';
import adteesImage from '../../../../assets/img/adtees.jpg';
import unchalisImage from '../../../../assets/img/unchalis.jpg';
import chalisImage from '../../../../assets/img/chalis.jpg';
import ektalisImage from '../../../../assets/img/ektalis.jpg';
import bayalisImage from '../../../../assets/img/bayalis.jpg';
import tetalisImage from '../../../../assets/img/tetalis.jpg';
import chavalisImage from '../../../../assets/img/chavalis.jpg';
import paitalisImage from '../../../../assets/img/paitalis.jpg';
import chayalisImage from '../../../../assets/img/chayalis.jpg';
import saitalisImage from '../../../../assets/img/saitalis.jpg';
import adtalisImage from '../../../../assets/img/adtalis.jpg';
import unchasImage from '../../../../assets/img/unchas.jpg';
import pachasImage from '../../../../assets/img/pachas.jpg';
import ikyavanImage from '../../../../assets/img/ikyavan.jpg';
import bavanImage from '../../../../assets/img/bavan.jpg';
import tirepanImage from '../../../../assets/img/tirepan.jpg';
import chauvanImage from '../../../../assets/img/chauvan.jpg';
import pachpanImage from '../../../../assets/img/pachpan.jpg';
import chappanImage from '../../../../assets/img/chappan.jpg';
import santavanImage from '../../../../assets/img/santavan.jpg';
import anthavanImage from '../../../../assets/img/anthavan.jpg';
import unsathImage from '../../../../assets/img/unsath.jpg';
import saathImage from '../../../../assets/img/saath.jpg';
import iksathImage from '../../../../assets/img/iksath.jpg';
import basathImage from '../../../../assets/img/basath.jpg';
import tirsathImage from '../../../../assets/img/tirsath.jpg';
import chausathImage from '../../../../assets/img/chausath.jpg';
import paisathImage from '../../../../assets/img/paisath.jpg';
import chiyasathImage from '../../../../assets/img/chiyasath.jpg';
import sadsathImage from '../../../../assets/img/sadsath.jpg';
import adsathImage from '../../../../assets/img/adsath.jpg';
import unhattarImage from '../../../../assets/img/unhattar.jpg';
import sattarImage from '../../../../assets/img/sattar.jpg';
import ikhattarImage from '../../../../assets/img/ikhattar.jpg';
import bahattarImage from '../../../../assets/img/bahattar.jpg';
import tihattarImage from '../../../../assets/img/tihattar.jpg';
import chauhattarImage from '../../../../assets/img/chauhattar.jpg';
import pachattarImage from '../../../../assets/img/pachattar.jpg';
import chiyattarImage from '../../../../assets/img/chiyattar.jpg';
import satattarImage from '../../../../assets/img/satattar.jpg';
import athattarImage from '../../../../assets/img/athattar.jpg';
import UnasiImage from '../../../../assets/img/Unasi.jpg';
import assiImage from '../../../../assets/img/assi.jpg';
import ikyasiImage from '../../../../assets/img/ikyasi.jpg';
import bayasiImage from '../../../../assets/img/bayasi.jpg';
import terasiImage from '../../../../assets/img/terasi.jpg';
import chaurasiImage from '../../../../assets/img/chaurasi.jpg';
import pachasiImage from '../../../../assets/img/pachasi.jpg';
import chiyasiImage from '../../../../assets/img/chiyasi.jpg';
import satasiImage from '../../../../assets/img/satasi.jpg';
import athasiImage from '../../../../assets/img/athasi.jpg';
import navasiImage from '../../../../assets/img/navasi.jpg';
import nabbeImage from '../../../../assets/img/nabbe.jpg';
import ikyanveImage from '../../../../assets/img/ikyanve.jpg';
import banaveImage from '../../../../assets/img/banave.jpg';
import tiranveImage from '../../../../assets/img/tiranve.jpg';
import chauranbeImage from '../../../../assets/img/chauranbe.jpg';
import pachanveImage from '../../../../assets/img/pachanve.jpg';
import chiyanveImage from '../../../../assets/img/chiyanve.jpg';
import santanveImage from '../../../../assets/img/santanve.jpg';
import anthanveImage from '../../../../assets/img/anthanve.jpg';
import ninyanveImage from '../../../../assets/img/ninyanve.jpg';
import sauImage from '../../../../assets/img/sau.jpg';
import hazaarImage from '../../../../assets/img/hazaar.jpg';
import lakhImage from '../../../../assets/img/lakh.jpg';



interface ServerData {
  LangWiseWords: string | null;
  HWord: string ;
  Recid: number | null;
  WordPic:string;
  WordSound:string;
  
  // Add other properties if your server response contains them
}
LogBox.ignoreAllLogs();

const Ecerciseonevbprabodh = (props:any) => {

  const navigation = useNavigation();
  const Package = props.route.params.Package;
  const Medium = props.route.params.Medium;
  const { ApiResponse } =  props.route.params;
  const selectedItemText= props.route.params.selectedItemText;//finding text
  const indexofgencategory = props.route.params.selectedItemIndex;//finding index
  const langWiseWords = ApiResponse.map((item:any) => item.LangWiseWords);//for mapping index
  const titleofexone = langWiseWords[219];
  const Excersice ='Exr1'

  const [ExrData, setExrData] = useState<ServerData[]>([]);
  const [randomImages, setRandomImages] = useState<string[]>([]);
  const [randomWord, setRandomWord] = useState<string | null>(null);
   
  

  const data = ['Animal','Bird','Body Part','Colour','Cardinal Number','Month','Flower','Fruit','Day','Musical Instrument','Places','Relation','Rivers','Season','Common Verbs'];
     // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (indexofgencategory >= 0 && indexofgencategory < data.length) {
  //         const selectedData = data[indexofgencategory];
  
  //         const response = await axios.post('https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getGeneralVocabData/', {
  //           "LangSelected": Medium,
  //           "PackSelected": Package,
  //           "GenCategory": selectedData, // Include selectedData in the request
  //           "SectionName": "Exr1"
  //         });
  
  //         setExrData(response.data);
  //         // console.log(response.data)
  //       } else {
  //         console.error('Index out of range');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, [Package, props.route.params.selectedItemText, indexofgencategory, Medium]);
     

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (indexofgencategory >= 0 && indexofgencategory < data.length) {
          const selectedData = data[indexofgencategory];

          const response = await axios.post('https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getGeneralVocabData/', {
            "LangSelected": Medium,
            "PackSelected": Package,
            "GenCategory": selectedData,
            "SectionName": "Exr1"
          });

          setExrData(response.data);

          const randomIndices: number[] = [];
          while (randomIndices.length < 4) {
            const randomIndex = Math.floor(Math.random() * response.data.length);
            if (!randomIndices.includes(randomIndex)) {
              randomIndices.push(randomIndex);
            }
          }

          const randomImagePaths = randomIndices.map(index => response.data[index]?.WordPic || '');
          setRandomImages(randomImagePaths);

          // Get a single random word from HWord
          const randomWordIndex = Math.floor(Math.random() * response.data.length);
          setRandomWord(response.data[randomWordIndex]?.HWord || null);
  

        } else {
          console.error('Index out of range');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [Package, selectedItemText, indexofgencategory, Medium]);

  const getImageByWordPic = (wordPic:any) => {
    switch (wordPic) {
      case 'baagh.jpg':
        return baaghImage;
      case 'sher.jpg':
        return sherImage;
      case 'billi.jpg':
        return billiImage;
      case 'kutta.jpg':
        return kuttaImage;
      case 'haathi.jpg':
        return haathiImage;
      case 'ghoda.jpg':
        return ghodaImage;
      case 'gadha.jpg':
        return gadhaImage;
      case 'bhalu.jpg':
        return bhaluImage;
      case 'cheeta.jpg':
        return cheetaImage;
      case 'gaay.jpg':
        return gaayImage;
      case 'lomdi.jpg':
        return lomdiImage;
      case 'unt.jpg':
        return untImage;
      // Add other cases for different image names
      case 'murgi.jpg':
        return murgiImage;
      case 'tota.jpg':
        return totaImage;
      case 'more.jpg':
        return moreImage;
      case 'kauva.jpg':
        return kauvaImage;
      case 'ullu.jpg':
        return ulluImage;
      case 'bulbul.jpg':
        return bulbulImage;
      case 'baaz.jpg':
        return baazImage;
      case 'hans.jpg':
        return hansImage;
      case 'kabutar.jpg':
        return kabutarImage;
      case 'battakh.jpg':
        return battakhImage;
      case 'angutha.jpg':
        return anguthaImage;
      case 'honth.jpg':
        return honthImage;
      case 'kamar.jpg':
        return kamarImage;
      case 'kohani.jpg':
        return kohaniImage;
      case 'daant.jpg':
        return daantImage;
      case 'naak.jpg':
        return naakImage;
      case 'nakhoon.jpg':
        return nakhoonImage;
      case 'gardan.jpg':
        return gardanImage;
      case 'gala.jpg':
        return galaImage;
      case 'ghutana.jpg':
        return ghutanaImage;
      case 'ungli.jpg':
        return ungliImage;
      case 'peeth.jpg':
        return peethImage;
      case 'paanv.jpg':
        return paanvImage;
      case 'banh.jpg':
        return banhImage;
      case 'matha.jpg':
        return mathaImage;
      case 'mukh.jpg':
        return mukhImage;
      case 'sharir.jpg':
        return sharirImage;
      case 'haddi.jpg':
        return haddiImage;
      case 'aankh.jpg':
        return aankhImage;
      case 'kaan.jpg':
        return kaanImage;
      case 'baal.jpg':
        return baalImage;
      case 'haath.jpg':
        return haathImage;
      case 'safed.jpg':
        return safedImage;
      case 'lal.jpg':
        return lalImage;
      case 'peela.jpg':
        return peelaImage;
      case 'neela.jpg':
        return neelaImage;
      case 'kaala.jpg':
        return kaalaImage;
      case 'baingani.jpg':
        return bainganiImage;
      case 'bhura.jpg':
        return bhuraImage;
      case 'hara.jpg':
        return haraImage;
      case 'narangi.jpg':
        return narangiImage;
      case 'gulabi.jpg':
        return gulabiImage;
      case 'dhusar.jpg':
        return dhusarImage;
      case 'January.jpg':
        return januaryImage;
      case 'February.jpg':
        return februaryImage;
      case 'March.jpg':
        return marchImage;
      case 'April.jpg':
        return aprilImage;
      case 'May.jpg':
        return mayImage;
      case 'June.jpg':
        return juneImage;
      case 'July.jpg':
        return julyImage;
      case 'August.jpg':
        return augustImage;
      case 'September.jpg':
        return septemberImage;
      case 'October.jpg':
        return octoberImage;
      case 'November.jpg':
        return novemberImage;
      case 'December.jpg':
        return decemberImage;
      case 'gulab.jpg':
        return gulabImage;
      case 'chameli.jpg':
        return chameliImage;
      case 'kamal.jpg':
        return kamalImage;
      case 'suryamukhi.jpg':
        return suryamukhiImage;
      case 'rajnigandha.jpg':
        return rajnigandhaImage;
      case 'bela.jpg':
        return belaImage;
      case 'genda.jpg':
        return gendaImage;
      case 'leely.jpg':
        return leelyImage;
      case 'juhi.jpg':
        return juhiImage;
      case 'sadabhar.jpg':
        return sadabharImage;
      case 'jaswand.jpg':
        return jaswandImage;
      case 'dahlia.jpg':
        return dahliaImage;
      case 'kela.jpg':
        return kelaImage;
      case 'seb.jpg':
        return sebImage;
      case 'anar.jpg':
        return anarImage;
      case 'angoor.jpg':
        return angoorImage;
      case 'tarbooj.jpg':
        return tarboojImage;
      case 'amrud.jpg':
        return amrudImage;
      case 'santara.jpg':
        return santaraImage;
      case 'khajur.jpg':
        return khajurImage;
      case 'papita.jpg':
        return papitaImage;
      case 'anjeer.jpg':
        return anjeerImage;
      case 'nimbu.jpg':
        return nimbuImage;
      case 'ananus.jpg':
        return ananusImage;
      case 'mosambi.jpg':
        return mosambiImage;
      case 'tamatar.jpg':
        return tamatarImage;
      case 'Somwar.jpg':
        return somwarImage;
      case 'Magalwar.jpg':
        return magalwarImage;
      case 'Budhwar.jpg':
        return budhwarImage;
      case 'Guruwar.jpg':
        return guruwarImage;
      case 'Shukrawar.jpg':
        return shukrawarImage;
      case 'Shaniwar.jpg':
        return shaniwarImage;
      case 'Raviwar.jpg':
        return raviwarImage;
      case 'Sarod.jpg':
        return sarodImage;
      case 'Sitaar.jpg':
        return sitaarImage;
      case 'Shehnai.jpg':
        return shehnaiImage;
      case 'Tabla.jpg':
        return tablaImage;
      case 'Harmonium.jpg':
        return harmoniumImage;
      case 'jhanjh.jpg':
        return jhanjhImage;
      case 'Pakhawaj.jpg':
        return pakhawajImage;
      case 'Esraj.jpg':
        return esrajImage;
      case 'Veena.jpg':
        return veenaImage;
      case 'Dholak.jpg':
        return dholakImage;
      case 'Sarangi.jpg':
        return sarangiImage;
      case 'Damaru.jpg':
        return damaruImage;
      case 'Santoor.jpg':
        return santoorImage;
      case 'aspatal.jpg':
        return aspatalImage;
      case 'bazar.jpg':
        return bazarImage;
      case 'school.jpg':
        return schoolImage;
      case 'dukan.jpg':
        return dukanImage;
      case 'mandir.jpg':
        return mandirImage;
      case 'masjid.jpg':
        return masjidImage;
      case 'girja.jpg':
        return girjaImage;
      case 'Hawai_adda.jpg':
        return hawaiAddaImage;
      case 'station.jpg':
        return stationImage;
      case 'ps.jpg':
        return psImage;
      case 'parliament.jpg':
        return parliamentImage;
      case 'family.jpg':
        return familyImage;
      case 'river.jpg':
        return riverImage;
      case 'basant.jpg':
        return basantImage;
      case 'grishma.jpg':
        return grishmaImage;
      case 'varsha.jpg':
        return varshaImage;
      case 'sharad.jpg':
        return sharadImage;
      case 'hemant.jpg':
        return hemantImage;
      case 'aana.jpg':
        return aanaImage;
      case 'jaana.jpg':
        return jaanaImage;
      case 'karna.jpg':
        return karnaImage;
      case 'khana.jpg':
        return khanaImage;
      case 'sona.jpg':
        return sonaImage;
      case 'dekhna.jpg':
        return dekhnaImage;
      case 'bolna.jpg':
        return bolnaImage;
      case 'dena.jpg':
        return denaImage;
      case 'padhna.jpg':
        return padhnaImage;
      case 'peena.jpg':
        return peenaImage;
      case 'poochna.jpg':
        return poochnaImage;
      case 'batana.jpg':
        return batanaImage;
      case 'bulana.jpg':
        return bulanaImage;
      case 'baithna.jpg':
        return baithnaImage;
      case 'sunana.jpg':
        return sunanaImage;
      case 'khelna.jpg':
        return khelnaImage;
      case 'daudna.jpg':
        return daudnaImage;
      case 'bhaagna.jpg':
        return bhaagnaImage;
      
        
        case 'ninyanve.jpg':
          return ninyanveImage;
        case 'sau.jpg':
          return sauImage;
        case 'hazaar.jpg':
          return hazaarImage;
        case 'lakh.jpg':
          return lakhImage;

          case 'chausath.jpg':
            return chausathImage;
          case 'paisath.jpg':
            return paisathImage;
          case 'chiyasath.jpg':
            return chiyasathImage;
          case 'sadsath.jpg':
            return sadsathImage;
          case 'adsath.jpg':
            return adsathImage;
          case 'unhattar.jpg':
            return unhattarImage;
          case 'sattar.jpg':
            return sattarImage;
          case 'ikhattar.jpg':
            return ikhattarImage;
          case 'bahattar.jpg':
            return bahattarImage;
          case 'tihattar.jpg':
            return tihattarImage;
          case 'chauhattar.jpg':
            return chauhattarImage;
          case 'pachattar.jpg':
            return pachattarImage;
          case 'chiyattar.jpg':
            return chiyattarImage;
          case 'satattar.jpg':
            return satattarImage;
          case 'athattar.jpg':
            return athattarImage;
          case 'Unasi.jpg':
            return UnasiImage;
          case 'assi.jpg':
            return assiImage;
          case 'ikyasi.jpg':
            return ikyasiImage;
          case 'bayasi.jpg':
            return bayasiImage;
          case 'terasi.jpg':
            return terasiImage;
          case 'chaurasi.jpg':
            return chaurasiImage;
          case 'pachasi.jpg':
            return pachasiImage;
          case 'chiyasi.jpg':
            return chiyasiImage;
          case 'satasi.jpg':
            return satasiImage;
          case 'athasi.jpg':
            return athasiImage;
          case 'navasi.jpg':
            return navasiImage;
          case 'nabbe.jpg':
            return nabbeImage;
          case 'ikyanve.jpg':
            return ikyanveImage;
          case 'banave.jpg':
            return banaveImage;
          case 'tiranve.jpg':
            return tiranveImage;
          case 'chauranbe.jpg':
            return chauranbeImage;
          case 'pachanve.jpg':
            return pachanveImage;
          case 'chiyanve.jpg':
            return chiyanveImage;
          case 'santanve.jpg':
            return santanveImage;
          case 'anthanve.jpg':
          return anthanveImage ;
          case 'chalis.jpg':
            return chalisImage;
          case 'ektalis.jpg':
            return ektalisImage;
          case 'bayalis.jpg':
            return bayalisImage;
          case 'tetalis.jpg':
            return tetalisImage;
          case 'chavalis.jpg':
            return chavalisImage;
          case 'paitalis.jpg':
            return paitalisImage;
          case 'chayalis.jpg':
            return chayalisImage;
          case 'saitalis.jpg':
            return saitalisImage;
          case 'adtalis.jpg':
            return adtalisImage;
          case 'unchas.jpg':
            return unchasImage;
          case 'pachas.jpg':
            return pachasImage;
          case 'ikyavan.jpg':
            return ikyavanImage;
          case 'bavan.jpg':
            return bavanImage;
          case 'tirepan.jpg':
            return tirepanImage;
          case 'chauvan.jpg':
            return chauvanImage;
          case 'pachpan.jpg':
            return pachpanImage;
          case 'chappan.jpg':
            return chappanImage;
          case 'santavan.jpg':
            return santavanImage;
          case 'anthavan.jpg':
            return anthavanImage;
          case 'unsath.jpg':
            return unsathImage;
          case 'saath.jpg':
            return saathImage;
          case 'iksath.jpg':
            return iksathImage;
          case 'basath.jpg':
            return basathImage;
          case 'tirsath.jpg':
            return tirsathImage;
          
case 'bees.jpg':
  return beesImage;
case 'ikkees.jpg':
  return ikkeesImage;
case 'baaees.jpg':
  return baaeesImage;
case 'taees.jpg':
  return taeesImage;
case 'chaubees.jpg':
  return chaubeesImage;
case 'pachees.jpg':
  return pacheesImage;
case 'chabees.jpg':
  return chabeesImage;
case 'sattaees.jpg':
  return sattaeesImage;
case 'athaees.jpg':
  return athaeesImage;
case 'untees.jpg':
  return unteesImage;
case 'tees.jpg':
  return teesImage;
case 'ektees.jpg':
  return ekteesImage;
case 'battees.jpg':
  return batteesImage;
case 'taitees.jpg':
  return taiteesImage;
case 'chautees.jpg':
  return chauteesImage;
case 'paitees.jpg':
  return paiteesImage;
case 'chatees.jpg':
  return chateesImage;
case 'saitees.jpg':
  return saiteesImage;
case 'adtees.jpg':
  return adteesImage;
case 'unchalis.jpg':
  return unchalisImage;
  case 'shoonya.jpg':
    return shoonyaImage;
  case 'ek.jpg':
    return ekImage;
  case 'do.jpg':
    return doImage;
  case 'teen.jpg':
    return teenImage;
  case 'char.jpg':
    return charImage;
  case 'paanch.jpg':
    return paanchImage;
  case 'chheh.jpg':
    return chhehImage;
  case 'saat.jpg':
    return saatImage;
  case 'aath.jpg':
    return aathImage;
  case 'nau.jpg':
    return nauImage;
  case 'das.jpg':
    return dasImage;
  case 'gyarah.jpg':
    return gyarahImage;
  case 'baarah.jpg':
    return baarahImage;
  case 'terah.jpg':
    return terahImage;
  case 'chaudah.jpg':
    return chaudahImage;
  case 'pandrah.jpg':
    return pandrahImage;
  case 'solah.jpg':
    return solahImage;
  case 'satrah.jpg':
    return satrahImage;
  case 'atharah.jpg':
    return atharahImage;
  case 'unnes.jpg':
    return unnesImage;
      default:
        return null;
    }
  };
// Function to get image source based on WordPic
const getImageByWordPic1 = (wordPic: string) => {
  return { uri: `asset:/app/src/main/assets/img/${wordPic}` }; // Adjust the path as needed
};





  const handleBackPress = () => {
    navigation.goBack();
  };
  // Function to handle the home button press 
  const handleHomePress = () => {
    // Navigate to the home screen or the desired screen
   props.navigation.navigate('Home',{Package,Medium,ApiResponse});
  };



  const handleImagePress = (index: number) => {
    // Check if the pressed image index matches the index of the random word
    if (randomWord !== null && index === randomImages.indexOf(randomWord)) {
      // If they match, update both the random images and the random word
      const newRandomIndices: number[] = [];
      while (newRandomIndices.length < 4) {
        const newRandomIndex = Math.floor(Math.random() * ExrData.length);
        if (!newRandomIndices.includes(newRandomIndex)) {
          newRandomIndices.push(newRandomIndex);
        }
      }
  
      const newRandomImagePaths = newRandomIndices.map((newIndex) => ExrData[newIndex]?.WordPic || '');
      setRandomImages(newRandomImagePaths);
  
      // Get a new single random word from HWord
      const newRandomWordIndex = Math.floor(Math.random() * ExrData.length);
      setRandomWord(ExrData[newRandomWordIndex]?.HWord || ''); // Provide a default value here
    }
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity onPress={() => handleImagePress(index)}>
      <Image key={index} style={styles.imageStyle} source={getImageByWordPic(item) || require('../../../../assets/img/baagh.jpg')} />
    </TouchableOpacity>
  );
 

  return (
    
    <View style={{flex:1}}>

     <View style={styles.header}>
        {/* Left side - Back icon */}
        <TouchableOpacity  onPress={handleBackPress}>
          {/* <MaterialIcons style={styles.headerIcon} name="arrow-back" size={32} color="white" /> */}
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{titleofexone}</Text>

        {/* Right side - Home icon this page dosnt have this  */}
        <TouchableOpacity onPress={handleHomePress}>
          {/* <MaterialIcons  style={styles.headerIcon} name="home" size={32} color="white" /> */}
        </TouchableOpacity>
      </View>
  

            <ImageBackground
            source={require('../../../../assets/img/bg.png')} // Provide the path to your image
            style={styles.backgroundImage}>

        <View style={styles.container}>
              <FlatList
                data={randomImages}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                
              />

              {randomWord && (
                <View style={styles.randomWordContainer}>
                  <Text style={styles.randomWordText}>{randomWord}</Text>
                </View>
              )}
        </View>
            {/* <View>
              <Text>Ecercise one vb prabodh handle here</Text>
              <Text>{Package}</Text>
              <Text>{Medium}</Text>
              <Text>{selectedItemText}</Text>
              <Text>{indexofgencategory}</Text>

            </View> */}
            </ImageBackground>

    </View>
  )
}

export default Ecerciseonevbprabodh

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
        header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
        backgroundColor: '#0D6EFD',
        paddingVertical: 12,  }
      ,
       headerIcon: {
         width: 30,
         alignItems: 'center',
       },
       headerTitle: {
         color: 'white',
         fontSize: 20, // Adjust the font size as needed
       },

       container: {
         padding:16,
        
        
      },
      
      imageStyle: {
        width: '40%',
        aspectRatio: 1,
        margin: 8,
        borderRadius: 8,
      },
      randomWordContainer: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
      },
      randomWordText: {
        fontSize: 20,
        fontWeight: 'bold',
      },
})