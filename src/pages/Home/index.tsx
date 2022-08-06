import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Draw from '../../components/Draw';
import Answer from '../../components/Answer';
import { v4 as uuidv4 } from 'uuid';

import socket from '../../components/Socket/index';

import { useQuery } from '@tanstack/react-query';

// import api from '../../services/api';

import './styles.css';

import cavaloIcon from '../../assets/emotes/cavalo2.png';
import ruimIcon from '../../assets/emotes/ruim2.png';
import surpriseIcon from '../../assets/emotes/surprise.png';
import tanIcon from '../../assets/emotes/tan2.png';
import eoqIcon from '../../assets/emotes/eoq.png';
import faustaoIcon from '../../assets/emotes/faustao.png';
import chavesIcon from '../../assets/emotes/chaves.png';
import macacoIcon from '../../assets/emotes/macaco.png';
import facepalmIcon from '../../assets/emotes/facepalm2.png';
import peidoIcon from '../../assets/emotes/peido.png';
import rojaoIcon from '../../assets/emotes/rojao.png';

// const eoq = require('../../assets/sounds/eoq.mp3');
// const burro = require ('../../assets/sounds/burro.mp3');
// const cavalo = require ('../../assets/sounds/cavalo.mp3');
// const errou = require ('../../assets/sounds/errou.mp3');
// const facepalm = require ('../../assets/sounds/facepalm.mp3');
// const macaco = require ('../../assets/sounds/olha-o-macaco.mp3');
// const peido = require ('../../assets/sounds/peido.mp3');
// const rojao = require ('../../assets/sounds/rojao.mp3');
// const shock = require ('../../assets/sounds/shock.mp3');
// const tan = require ('../../assets/sounds/tan.mp3');
// const surprise = require ('../../assets/sounds/surprise.mp3');
// const ruim = require ('../../assets/sounds/ruim.mp3');

import ShowDraw from '../../components/ShowDraw';
import { useUser } from '../../hooks/useUser';
import { Room, RoomPlayers } from '../../interfaces/iRoom';
import { User } from '../../interfaces/iUser';
import { useRoom } from '../../hooks/useRoom';
import { useMatch } from '../../hooks/useMatch';
import { EndMatch, Match, MatchRounds, Round } from '../../interfaces/iMatch';
import { useRound } from '../../hooks/useRound';
import { Content, EnumRoundType, ReceivingRound } from '../../interfaces/iRound';
import api from '../../providers';
import axios from 'axios';

// const soundsList = [
//     { sound: eoq, idSound: 1 },
//     { sound: burro, idSound: 2 },
//     { sound: cavalo, idSound: 3 },
//     { sound: errou, idSound: 4 },
//     { sound: facepalm, idSound: 5 },
//     { sound: macaco, idSound: 6 },
//     { sound: peido, idSound: 7 },
//     { sound: rojao, idSound: 8 },
//     { sound: shock, idSound: 9 },
//     { sound: tan, idSound: 10 },
//     { sound: surprise, idSound: 11 },
//     { sound: ruim, idSound: 12 },
// ]
interface Message {
    text: string;
    author: string;
}

export default function RegisterUser() {
    // const { getall, login, logoff, getUser } = useUser();
    const { getall, login, logoff } = useUser();
    // const { exit, getPlayers, getRoom } = useRoom();
    const { exit } = useRoom();
    const { createMatch } = useMatch();
    const { createRound } = useRound();
    const b = true;
    const nickname = localStorage.getItem('nickname');
    const user_id = localStorage.getItem('user_id');

    // const token = localStorage.getItem('tokenUser');
    const roomCode = localStorage.getItem('roomCode');
    const room_id = localStorage.getItem('room_id');

    const [room, setRoom] = useState<Room | any>();
    const [user, setUser] = useState<User | any>();

    const [phrases, setPhrases] = useState<Content[]>([
        // { content: 'frase 1', match_id: 'id1' },
        // { content: 'frase2', match_id: 'id2' },
    ]);
    const a =
        '{"lines":[{"points":[{"x":199,"y":105},{"x":199,"y":105},{"x":198,"y":106},{"x":198,"y":107},{"x":197,"y":107},{"x":196,"y":107},{"x":195,"y":107},{"x":195,"y":108},{"x":194,"y":108},{"x":193,"y":109},{"x":192,"y":109},{"x":192,"y":110},{"x":191,"y":110},{"x":189,"y":110},{"x":189,"y":111},{"x":188,"y":111},{"x":187,"y":111},{"x":186,"y":112},{"x":184,"y":113},{"x":182,"y":114},{"x":181,"y":114},{"x":180,"y":115},{"x":179,"y":115},{"x":177,"y":116},{"x":176,"y":117},{"x":175,"y":117},{"x":174,"y":118},{"x":171,"y":119},{"x":169,"y":120},{"x":168,"y":120},{"x":167,"y":121},{"x":165,"y":123},{"x":164,"y":123},{"x":162,"y":123},{"x":162,"y":125},{"x":159,"y":125},{"x":159,"y":126},{"x":157,"y":126},{"x":156,"y":127},{"x":150,"y":130},{"x":149,"y":130},{"x":148,"y":131},{"x":147,"y":131},{"x":146,"y":132},{"x":145,"y":134},{"x":144,"y":134},{"x":144,"y":135},{"x":142,"y":136},{"x":141,"y":136},{"x":141,"y":137},{"x":140,"y":137},{"x":139,"y":138},{"x":138,"y":138},{"x":137,"y":138},{"x":137,"y":140},{"x":136,"y":140},{"x":134,"y":141},{"x":133,"y":141},{"x":133,"y":142},{"x":132,"y":143},{"x":131,"y":143},{"x":131,"y":144},{"x":130,"y":145},{"x":127,"y":145},{"x":127,"y":146},{"x":126,"y":146},{"x":126,"y":147},{"x":125,"y":147},{"x":125,"y":148},{"x":125,"y":149},{"x":124,"y":151},{"x":123,"y":151},{"x":122,"y":152},{"x":122,"y":153},{"x":122,"y":154},{"x":122,"y":155},{"x":121,"y":155},{"x":121,"y":157},{"x":121,"y":158},{"x":120,"y":159},{"x":120,"y":160},{"x":120,"y":161},{"x":119,"y":163},{"x":119,"y":164},{"x":119,"y":166},{"x":119,"y":167},{"x":119,"y":169},{"x":119,"y":170},{"x":119,"y":171},{"x":119,"y":173},{"x":119,"y":175},{"x":119,"y":176},{"x":119,"y":179},{"x":119,"y":180},{"x":119,"y":182},{"x":119,"y":183},{"x":119,"y":185},{"x":120,"y":185},{"x":120,"y":186},{"x":121,"y":187},{"x":121,"y":188},{"x":121,"y":189},{"x":121,"y":190},{"x":122,"y":191},{"x":122,"y":192},{"x":123,"y":192},{"x":123,"y":194},{"x":124,"y":194},{"x":124,"y":195},{"x":125,"y":196},{"x":126,"y":198},{"x":128,"y":199},{"x":128,"y":200},{"x":128,"y":201},{"x":129,"y":201},{"x":129,"y":202},{"x":130,"y":203},{"x":131,"y":203},{"x":132,"y":203},{"x":132,"y":204},{"x":132,"y":205},{"x":134,"y":206},{"x":135,"y":206},{"x":135,"y":207},{"x":136,"y":208},{"x":137,"y":208},{"x":138,"y":209},{"x":140,"y":211},{"x":141,"y":211},{"x":143,"y":213},{"x":145,"y":214},{"x":146,"y":215},{"x":147,"y":215},{"x":149,"y":217},{"x":151,"y":218},{"x":152,"y":218},{"x":153,"y":219},{"x":155,"y":221},{"x":157,"y":222},{"x":158,"y":223},{"x":159,"y":223},{"x":160,"y":224},{"x":161,"y":224},{"x":163,"y":225},{"x":163,"y":226},{"x":164,"y":226},{"x":165,"y":227},{"x":166,"y":228},{"x":168,"y":229},{"x":169,"y":229},{"x":170,"y":231},{"x":171,"y":231},{"x":172,"y":231},{"x":172,"y":232},{"x":174,"y":232},{"x":175,"y":232},{"x":176,"y":233},{"x":176,"y":234},{"x":177,"y":234},{"x":178,"y":234},{"x":178,"y":235},{"x":180,"y":235},{"x":180,"y":236},{"x":182,"y":236},{"x":182,"y":238},{"x":183,"y":238},{"x":184,"y":238},{"x":185,"y":238},{"x":186,"y":238},{"x":187,"y":239},{"x":188,"y":240},{"x":190,"y":240},{"x":191,"y":241},{"x":192,"y":241},{"x":193,"y":242},{"x":195,"y":243},{"x":196,"y":243},{"x":196,"y":244},{"x":197,"y":244},{"x":199,"y":245},{"x":200,"y":245},{"x":201,"y":245},{"x":202,"y":245},{"x":203,"y":246},{"x":204,"y":246},{"x":205,"y":246},{"x":205,"y":247},{"x":206,"y":247},{"x":208,"y":248},{"x":209,"y":248},{"x":211,"y":248},{"x":211,"y":249},{"x":212,"y":249},{"x":213,"y":249},{"x":214,"y":249},{"x":215,"y":249},{"x":216,"y":250},{"x":217,"y":250},{"x":218,"y":250},{"x":218,"y":251},{"x":219,"y":251},{"x":220,"y":251},{"x":221,"y":252},{"x":222,"y":252},{"x":223,"y":252},{"x":223,"y":253},{"x":224,"y":253},{"x":225,"y":253},{"x":226,"y":253},{"x":227,"y":253},{"x":227,"y":254},{"x":228,"y":254},{"x":229,"y":254},{"x":229,"y":254}],"brushColor":"#000000","brushRadius":5},{"points":[{"x":292,"y":235},{"x":292,"y":235},{"x":291,"y":235},{"x":290,"y":235},{"x":290,"y":234},{"x":289,"y":234},{"x":288,"y":234},{"x":287,"y":234},{"x":286,"y":234},{"x":285,"y":234},{"x":284,"y":234},{"x":283,"y":234},{"x":282,"y":234},{"x":281,"y":234},{"x":281,"y":233},{"x":280,"y":233},{"x":279,"y":233},{"x":278,"y":233},{"x":277,"y":233},{"x":276,"y":233},{"x":275,"y":233},{"x":274,"y":233},{"x":273,"y":233},{"x":272,"y":233},{"x":271,"y":233},{"x":270,"y":233},{"x":269,"y":233},{"x":268,"y":233},{"x":267,"y":233},{"x":266,"y":233},{"x":265,"y":233},{"x":264,"y":233},{"x":263,"y":233},{"x":262,"y":233},{"x":261,"y":233},{"x":260,"y":233},{"x":259,"y":233},{"x":258,"y":233},{"x":257,"y":233},{"x":256,"y":233},{"x":255,"y":233},{"x":254,"y":233},{"x":253,"y":233},{"x":253,"y":234},{"x":252,"y":235},{"x":251,"y":235},{"x":250,"y":235},{"x":249,"y":235},{"x":249,"y":236},{"x":248,"y":236},{"x":246,"y":236},{"x":246,"y":237},{"x":245,"y":237},{"x":244,"y":237},{"x":243,"y":239},{"x":242,"y":239},{"x":241,"y":241},{"x":240,"y":241},{"x":239,"y":241},{"x":239,"y":242},{"x":238,"y":242},{"x":238,"y":243},{"x":237,"y":243},{"x":236,"y":243},{"x":236,"y":244},{"x":235,"y":244},{"x":235,"y":245},{"x":234,"y":245},{"x":234,"y":246},{"x":233,"y":246},{"x":232,"y":246},{"x":232,"y":247},{"x":232,"y":248},{"x":231,"y":248},{"x":231,"y":249},{"x":230,"y":249},{"x":230,"y":250},{"x":230,"y":251},{"x":229,"y":251},{"x":228,"y":251},{"x":228,"y":252},{"x":228,"y":253},{"x":227,"y":253},{"x":227,"y":254},{"x":227,"y":255},{"x":227,"y":256},{"x":227,"y":257},{"x":227,"y":258},{"x":227,"y":259},{"x":227,"y":260},{"x":227,"y":261},{"x":227,"y":262},{"x":227,"y":263},{"x":227,"y":264},{"x":226,"y":264},{"x":226,"y":265},{"x":226,"y":266},{"x":226,"y":267},{"x":226,"y":268},{"x":226,"y":269},{"x":227,"y":269},{"x":227,"y":270},{"x":227,"y":271},{"x":228,"y":271},{"x":228,"y":272},{"x":229,"y":273},{"x":230,"y":274},{"x":231,"y":275},{"x":231,"y":276},{"x":232,"y":276},{"x":233,"y":276},{"x":233,"y":277},{"x":234,"y":277},{"x":234,"y":278},{"x":236,"y":278},{"x":236,"y":279},{"x":237,"y":279},{"x":238,"y":280},{"x":239,"y":280},{"x":239,"y":281},{"x":240,"y":281},{"x":241,"y":282},{"x":242,"y":282},{"x":243,"y":283},{"x":244,"y":283},{"x":244,"y":284},{"x":245,"y":284},{"x":246,"y":284},{"x":246,"y":285},{"x":247,"y":285},{"x":248,"y":286},{"x":249,"y":287},{"x":250,"y":287},{"x":251,"y":287},{"x":252,"y":289},{"x":253,"y":289},{"x":254,"y":289},{"x":254,"y":290},{"x":255,"y":290},{"x":256,"y":291},{"x":257,"y":291},{"x":259,"y":291},{"x":259,"y":293},{"x":260,"y":293},{"x":262,"y":294},{"x":263,"y":294},{"x":263,"y":295},{"x":264,"y":295},{"x":266,"y":296},{"x":267,"y":296},{"x":268,"y":296},{"x":269,"y":297},{"x":270,"y":297},{"x":271,"y":298},{"x":271,"y":299},{"x":272,"y":299},{"x":274,"y":299},{"x":275,"y":300},{"x":276,"y":301},{"x":278,"y":302},{"x":279,"y":302},{"x":280,"y":302},{"x":281,"y":302},{"x":282,"y":302},{"x":284,"y":302},{"x":284,"y":303},{"x":285,"y":303},{"x":286,"y":303},{"x":287,"y":303},{"x":288,"y":303},{"x":290,"y":303},{"x":290,"y":304},{"x":291,"y":304},{"x":292,"y":304},{"x":295,"y":304},{"x":296,"y":304},{"x":298,"y":304},{"x":299,"y":304},{"x":300,"y":304},{"x":301,"y":304},{"x":302,"y":304},{"x":303,"y":304},{"x":304,"y":304},{"x":305,"y":304},{"x":307,"y":304},{"x":308,"y":304},{"x":309,"y":304},{"x":310,"y":304},{"x":311,"y":304},{"x":312,"y":304},{"x":313,"y":304},{"x":314,"y":303},{"x":315,"y":303},{"x":316,"y":303},{"x":317,"y":303},{"x":318,"y":303},{"x":319,"y":303},{"x":320,"y":303},{"x":320,"y":302},{"x":321,"y":302},{"x":322,"y":302},{"x":323,"y":301},{"x":325,"y":301},{"x":325,"y":300},{"x":326,"y":300},{"x":327,"y":300},{"x":328,"y":300},{"x":329,"y":298},{"x":330,"y":298},{"x":330,"y":297},{"x":331,"y":297},{"x":332,"y":297},{"x":332,"y":296},{"x":334,"y":295},{"x":335,"y":295},{"x":335,"y":294},{"x":336,"y":294},{"x":337,"y":294},{"x":337,"y":293},{"x":338,"y":292},{"x":339,"y":290},{"x":340,"y":290},{"x":341,"y":289},{"x":341,"y":288},{"x":341,"y":287},{"x":342,"y":287},{"x":343,"y":285},{"x":343,"y":284},{"x":344,"y":284},{"x":344,"y":282},{"x":344,"y":281},{"x":345,"y":281},{"x":345,"y":279},{"x":345,"y":278},{"x":346,"y":277},{"x":346,"y":276},{"x":346,"y":275},{"x":346,"y":274},{"x":346,"y":273},{"x":346,"y":272},{"x":347,"y":271},{"x":347,"y":269},{"x":347,"y":268},{"x":347,"y":267},{"x":348,"y":267},{"x":348,"y":266},{"x":348,"y":265},{"x":348,"y":264},{"x":348,"y":263},{"x":348,"y":262},{"x":348,"y":261},{"x":348,"y":260},{"x":348,"y":258},{"x":348,"y":257},{"x":347,"y":256},{"x":347,"y":255},{"x":347,"y":254},{"x":347,"y":252},{"x":346,"y":251},{"x":346,"y":250},{"x":346,"y":248},{"x":345,"y":248},{"x":345,"y":247},{"x":345,"y":246},{"x":344,"y":245},{"x":343,"y":244},{"x":343,"y":243},{"x":342,"y":243},{"x":342,"y":242},{"x":342,"y":241},{"x":341,"y":240},{"x":340,"y":239},{"x":340,"y":238},{"x":339,"y":237},{"x":338,"y":237},{"x":338,"y":236},{"x":337,"y":236},{"x":337,"y":235},{"x":337,"y":234},{"x":336,"y":233},{"x":335,"y":233},{"x":334,"y":233},{"x":334,"y":232},{"x":333,"y":231},{"x":332,"y":231},{"x":332,"y":230},{"x":331,"y":230},{"x":331,"y":229},{"x":330,"y":229},{"x":329,"y":229},{"x":329,"y":228},{"x":328,"y":228},{"x":328,"y":227},{"x":327,"y":227},{"x":326,"y":227},{"x":326,"y":226},{"x":325,"y":226},{"x":324,"y":226},{"x":324,"y":225},{"x":323,"y":225},{"x":322,"y":225},{"x":321,"y":225},{"x":321,"y":224},{"x":321,"y":223},{"x":320,"y":223},{"x":318,"y":223},{"x":317,"y":222},{"x":316,"y":222},{"x":315,"y":222},{"x":314,"y":222},{"x":314,"y":221},{"x":313,"y":221},{"x":313,"y":221}],"brushColor":"#000000","brushRadius":5},{"points":[{"x":126,"y":311},{"x":126,"y":311},{"x":128,"y":314},{"x":129,"y":316},{"x":130,"y":317},{"x":130,"y":318},{"x":132,"y":319},{"x":134,"y":323},{"x":135,"y":324},{"x":136,"y":324},{"x":136,"y":325},{"x":137,"y":325},{"x":138,"y":326},{"x":139,"y":327},{"x":140,"y":327},{"x":140,"y":328},{"x":141,"y":328},{"x":142,"y":328},{"x":143,"y":329},{"x":144,"y":329},{"x":145,"y":329},{"x":146,"y":329},{"x":147,"y":329},{"x":148,"y":329},{"x":149,"y":329},{"x":150,"y":329},{"x":151,"y":329},{"x":151,"y":328},{"x":152,"y":328},{"x":153,"y":328},{"x":153,"y":327},{"x":154,"y":327},{"x":154,"y":326},{"x":155,"y":325},{"x":156,"y":325},{"x":157,"y":324},{"x":158,"y":323},{"x":159,"y":322},{"x":159,"y":321},{"x":161,"y":321},{"x":161,"y":319},{"x":162,"y":318},{"x":163,"y":316},{"x":164,"y":316},{"x":164,"y":315},{"x":165,"y":315},{"x":166,"y":313},{"x":167,"y":311},{"x":168,"y":311},{"x":169,"y":310},{"x":169,"y":308},{"x":171,"y":307},{"x":171,"y":306},{"x":173,"y":302},{"x":174,"y":301},{"x":176,"y":299},{"x":177,"y":297},{"x":178,"y":295},{"x":179,"y":293},{"x":181,"y":292},{"x":181,"y":290},{"x":182,"y":288},{"x":183,"y":288},{"x":184,"y":286},{"x":184,"y":284},{"x":186,"y":283},{"x":186,"y":281},{"x":188,"y":279},{"x":189,"y":277},{"x":189,"y":276},{"x":192,"y":273},{"x":193,"y":272},{"x":194,"y":268},{"x":195,"y":266},{"x":198,"y":263},{"x":201,"y":259},{"x":202,"y":254},{"x":204,"y":252},{"x":207,"y":248},{"x":210,"y":244},{"x":211,"y":243},{"x":214,"y":237},{"x":216,"y":236},{"x":216,"y":234},{"x":219,"y":231},{"x":219,"y":228},{"x":221,"y":227},{"x":223,"y":225},{"x":226,"y":221},{"x":227,"y":219},{"x":230,"y":216},{"x":231,"y":214},{"x":233,"y":213},{"x":235,"y":210},{"x":237,"y":208},{"x":240,"y":204},{"x":243,"y":203},{"x":243,"y":201},{"x":246,"y":199},{"x":247,"y":196},{"x":249,"y":195},{"x":252,"y":193},{"x":254,"y":190},{"x":256,"y":188},{"x":258,"y":187},{"x":260,"y":186},{"x":262,"y":185},{"x":264,"y":183},{"x":268,"y":180},{"x":269,"y":180},{"x":271,"y":178},{"x":273,"y":176},{"x":275,"y":175},{"x":277,"y":173},{"x":279,"y":173},{"x":281,"y":171},{"x":283,"y":170},{"x":285,"y":169},{"x":289,"y":165},{"x":290,"y":165},{"x":292,"y":164},{"x":294,"y":162},{"x":295,"y":162},{"x":297,"y":160},{"x":300,"y":159},{"x":302,"y":158},{"x":304,"y":157},{"x":306,"y":155},{"x":309,"y":153},{"x":311,"y":153},{"x":312,"y":151},{"x":315,"y":151},{"x":317,"y":150},{"x":318,"y":149},{"x":320,"y":148},{"x":322,"y":147},{"x":324,"y":146},{"x":326,"y":146},{"x":328,"y":145},{"x":329,"y":143},{"x":331,"y":143},{"x":333,"y":141},{"x":335,"y":141},{"x":337,"y":139},{"x":338,"y":139},{"x":342,"y":138},{"x":343,"y":138},{"x":345,"y":137},{"x":347,"y":136},{"x":348,"y":134},{"x":351,"y":133},{"x":352,"y":133},{"x":354,"y":132},{"x":356,"y":131},{"x":357,"y":131},{"x":361,"y":130},{"x":363,"y":128},{"x":365,"y":128},{"x":366,"y":128},{"x":369,"y":127},{"x":370,"y":127},{"x":373,"y":126},{"x":376,"y":126},{"x":380,"y":125},{"x":382,"y":125},{"x":384,"y":124},{"x":385,"y":124},{"x":387,"y":123},{"x":388,"y":123},{"x":390,"y":122},{"x":393,"y":121},{"x":394,"y":121},{"x":396,"y":120},{"x":397,"y":120},{"x":399,"y":119},{"x":401,"y":119},{"x":402,"y":118},{"x":403,"y":118},{"x":404,"y":117},{"x":405,"y":117},{"x":406,"y":117},{"x":408,"y":117},{"x":409,"y":116},{"x":410,"y":116},{"x":411,"y":116},{"x":413,"y":115},{"x":414,"y":115},{"x":415,"y":115},{"x":416,"y":115},{"x":417,"y":115},{"x":418,"y":115},{"x":419,"y":115},{"x":421,"y":115},{"x":422,"y":115},{"x":424,"y":115},{"x":425,"y":115},{"x":426,"y":115},{"x":427,"y":115},{"x":429,"y":115},{"x":430,"y":115},{"x":431,"y":115},{"x":432,"y":115},{"x":433,"y":115},{"x":435,"y":115},{"x":435,"y":116},{"x":436,"y":116},{"x":437,"y":116},{"x":437,"y":117},{"x":439,"y":117},{"x":439,"y":118},{"x":440,"y":118},{"x":440,"y":119},{"x":441,"y":119},{"x":441,"y":120},{"x":442,"y":120},{"x":442,"y":121},{"x":442,"y":122},{"x":444,"y":123},{"x":445,"y":123},{"x":445,"y":124},{"x":445,"y":125},{"x":445,"y":126},{"x":445,"y":127},{"x":444,"y":127},{"x":444,"y":128},{"x":444,"y":129},{"x":443,"y":129},{"x":443,"y":130},{"x":443,"y":131},{"x":442,"y":131},{"x":441,"y":132},{"x":441,"y":133},{"x":441,"y":134},{"x":440,"y":135},{"x":439,"y":135},{"x":439,"y":136},{"x":439,"y":137},{"x":438,"y":138},{"x":437,"y":139},{"x":437,"y":140},{"x":436,"y":141},{"x":435,"y":142},{"x":434,"y":143},{"x":433,"y":143},{"x":431,"y":144},{"x":430,"y":148},{"x":429,"y":149},{"x":427,"y":151},{"x":426,"y":152},{"x":424,"y":155},{"x":422,"y":155},{"x":420,"y":157},{"x":418,"y":159},{"x":417,"y":159},{"x":416,"y":161},{"x":415,"y":161},{"x":413,"y":163},{"x":412,"y":163},{"x":409,"y":165},{"x":408,"y":166},{"x":405,"y":167},{"x":402,"y":169},{"x":402,"y":170},{"x":400,"y":171},{"x":397,"y":173},{"x":395,"y":174},{"x":394,"y":174},{"x":391,"y":176},{"x":389,"y":178},{"x":386,"y":179},{"x":385,"y":180},{"x":382,"y":181},{"x":378,"y":183},{"x":377,"y":184},{"x":375,"y":185},{"x":374,"y":187},{"x":368,"y":189},{"x":367,"y":190},{"x":365,"y":190},{"x":363,"y":193},{"x":357,"y":196},{"x":355,"y":196},{"x":354,"y":198},{"x":352,"y":199},{"x":346,"y":201},{"x":345,"y":202},{"x":343,"y":204},{"x":339,"y":206},{"x":335,"y":209},{"x":332,"y":209},{"x":331,"y":210},{"x":330,"y":211},{"x":322,"y":215},{"x":321,"y":215},{"x":319,"y":217},{"x":317,"y":218},{"x":311,"y":222},{"x":310,"y":223},{"x":307,"y":225},{"x":305,"y":225},{"x":299,"y":229},{"x":297,"y":230},{"x":296,"y":231},{"x":293,"y":233},{"x":288,"y":236},{"x":287,"y":237},{"x":285,"y":239},{"x":280,"y":241},{"x":277,"y":243},{"x":274,"y":244},{"x":273,"y":246},{"x":271,"y":246},{"x":266,"y":250},{"x":264,"y":252},{"x":261,"y":254},{"x":259,"y":255},{"x":256,"y":257},{"x":254,"y":259},{"x":252,"y":261},{"x":251,"y":262},{"x":249,"y":263},{"x":246,"y":265},{"x":244,"y":268},{"x":242,"y":270},{"x":240,"y":272},{"x":237,"y":274},{"x":235,"y":276},{"x":234,"y":278},{"x":233,"y":279},{"x":232,"y":280},{"x":231,"y":284},{"x":229,"y":284},{"x":229,"y":286},{"x":227,"y":287},{"x":227,"y":289},{"x":225,"y":291},{"x":224,"y":293},{"x":224,"y":294},{"x":224,"y":296},{"x":223,"y":296},{"x":223,"y":298},{"x":222,"y":299},{"x":222,"y":300},{"x":222,"y":301},{"x":222,"y":302},{"x":222,"y":303},{"x":222,"y":304},{"x":222,"y":305},{"x":223,"y":306},{"x":223,"y":307},{"x":224,"y":308},{"x":224,"y":309},{"x":225,"y":311},{"x":226,"y":311},{"x":226,"y":312},{"x":228,"y":314},{"x":229,"y":315},{"x":229,"y":316},{"x":230,"y":317},{"x":233,"y":318},{"x":234,"y":320},{"x":235,"y":320},{"x":237,"y":321},{"x":240,"y":323},{"x":242,"y":324},{"x":243,"y":324},{"x":246,"y":326},{"x":252,"y":328},{"x":254,"y":329},{"x":256,"y":329},{"x":258,"y":330},{"x":262,"y":332},{"x":264,"y":332},{"x":267,"y":333},{"x":270,"y":333},{"x":276,"y":335},{"x":279,"y":335},{"x":282,"y":335},{"x":284,"y":335},{"x":288,"y":335},{"x":291,"y":335},{"x":296,"y":335},{"x":299,"y":335},{"x":303,"y":336},{"x":308,"y":337},{"x":310,"y":337},{"x":313,"y":337},{"x":319,"y":337},{"x":323,"y":338},{"x":326,"y":338},{"x":328,"y":338},{"x":332,"y":338},{"x":335,"y":338},{"x":341,"y":339},{"x":344,"y":339},{"x":352,"y":340},{"x":354,"y":340},{"x":357,"y":341},{"x":362,"y":342},{"x":368,"y":343},{"x":371,"y":343},{"x":372,"y":343},{"x":375,"y":344},{"x":381,"y":346},{"x":384,"y":346},{"x":389,"y":347},{"x":390,"y":349},{"x":395,"y":349},{"x":397,"y":350},{"x":399,"y":351},{"x":402,"y":353},{"x":409,"y":355},{"x":412,"y":356},{"x":417,"y":358},{"x":422,"y":361},{"x":431,"y":365},{"x":436,"y":368},{"x":440,"y":370},{"x":442,"y":370},{"x":444,"y":372},{"x":448,"y":374},{"x":450,"y":376},{"x":454,"y":378},{"x":455,"y":378},{"x":458,"y":381},{"x":459,"y":381},{"x":462,"y":383},{"x":463,"y":384},{"x":467,"y":386},{"x":467,"y":388},{"x":469,"y":388},{"x":471,"y":391},{"x":472,"y":393},{"x":473,"y":394},{"x":473,"y":395},{"x":475,"y":396},{"x":476,"y":398},{"x":476,"y":399},{"x":476,"y":400},{"x":476,"y":401},{"x":477,"y":402},{"x":478,"y":403},{"x":478,"y":404},{"x":478,"y":405},{"x":478,"y":406},{"x":478,"y":407},{"x":478,"y":408},{"x":478,"y":409},{"x":478,"y":410},{"x":478,"y":411},{"x":478,"y":413},{"x":478,"y":414},{"x":477,"y":414},{"x":477,"y":416},{"x":476,"y":416},{"x":476,"y":417},{"x":475,"y":417},{"x":475,"y":419},{"x":474,"y":420},{"x":474,"y":422},{"x":473,"y":422},{"x":472,"y":423},{"x":471,"y":424},{"x":470,"y":425},{"x":469,"y":426},{"x":469,"y":427},{"x":468,"y":427},{"x":467,"y":429},{"x":465,"y":431},{"x":464,"y":432},{"x":463,"y":432},{"x":462,"y":433},{"x":460,"y":434},{"x":459,"y":434},{"x":457,"y":436},{"x":455,"y":437},{"x":455,"y":438},{"x":454,"y":438},{"x":453,"y":439},{"x":451,"y":440},{"x":449,"y":441},{"x":448,"y":442},{"x":446,"y":443},{"x":443,"y":444},{"x":442,"y":445},{"x":441,"y":445},{"x":440,"y":446},{"x":438,"y":446},{"x":437,"y":447},{"x":435,"y":448},{"x":433,"y":448},{"x":433,"y":449},{"x":431,"y":449},{"x":429,"y":450},{"x":428,"y":451},{"x":425,"y":451},{"x":424,"y":452},{"x":422,"y":452},{"x":420,"y":452},{"x":416,"y":453},{"x":414,"y":453},{"x":413,"y":453},{"x":410,"y":454},{"x":408,"y":454},{"x":404,"y":455},{"x":403,"y":455},{"x":402,"y":455},{"x":398,"y":455},{"x":395,"y":455},{"x":391,"y":455},{"x":390,"y":455},{"x":385,"y":455},{"x":380,"y":455},{"x":378,"y":455},{"x":374,"y":455},{"x":370,"y":455},{"x":366,"y":455},{"x":361,"y":455},{"x":359,"y":455},{"x":352,"y":455},{"x":350,"y":455},{"x":343,"y":455},{"x":341,"y":455},{"x":338,"y":455},{"x":331,"y":455},{"x":327,"y":455},{"x":324,"y":455},{"x":318,"y":455},{"x":315,"y":455},{"x":308,"y":455},{"x":305,"y":455},{"x":298,"y":455},{"x":291,"y":454},{"x":288,"y":454},{"x":285,"y":453},{"x":279,"y":453},{"x":272,"y":452},{"x":264,"y":451},{"x":262,"y":451},{"x":258,"y":451},{"x":253,"y":450},{"x":245,"y":449},{"x":244,"y":448},{"x":241,"y":447},{"x":235,"y":446},{"x":233,"y":446},{"x":228,"y":445},{"x":225,"y":445},{"x":221,"y":444},{"x":219,"y":443},{"x":215,"y":443},{"x":214,"y":442},{"x":208,"y":441},{"x":205,"y":441},{"x":203,"y":440},{"x":200,"y":439},{"x":198,"y":438},{"x":196,"y":438},{"x":195,"y":437},{"x":197,"y":435},{"x":194,"y":434},{"x":192,"y":433},{"x":191,"y":433},{"x":189,"y":433},{"x":189,"y":431},{"x":188,"y":431},{"x":187,"y":431},{"x":187,"y":430},{"x":187,"y":429},{"x":186,"y":432},{"x":186,"y":433},{"x":188,"y":432},{"x":188,"y":431},{"x":189,"y":431},{"x":191,"y":430},{"x":192,"y":430},{"x":193,"y":429},{"x":194,"y":429},{"x":195,"y":428},{"x":196,"y":428},{"x":196,"y":427},{"x":198,"y":427},{"x":200,"y":426},{"x":201,"y":426},{"x":203,"y":425},{"x":204,"y":423},{"x":207,"y":423},{"x":208,"y":423},{"x":210,"y":422},{"x":211,"y":422},{"x":214,"y":421},{"x":215,"y":421},{"x":218,"y":420},{"x":219,"y":420},{"x":221,"y":419},{"x":218,"y":418},{"x":217,"y":418},{"x":218,"y":418},{"x":220,"y":416},{"x":221,"y":416},{"x":222,"y":416},{"x":224,"y":416},{"x":226,"y":416},{"x":227,"y":416},{"x":229,"y":416},{"x":230,"y":416},{"x":231,"y":416},{"x":232,"y":416},{"x":234,"y":416},{"x":235,"y":416},{"x":236,"y":416},{"x":237,"y":416},{"x":238,"y":416},{"x":239,"y":417},{"x":239,"y":417}],"brushColor":"#000000","brushRadius":5}],"width":538,"height":538}';

    const [draws, setDraws] = useState<Content[]>([
        // { content: a, match_id: 'id1' },
        // { content: a, match_id: 'id2' },
    ]);
    const [results, setResults] = useState<MatchRounds[]>([]);
    const [secondaryResults, setSecondaryResults] = useState<Round[]>([]);

    const [players, setPlayers] = useState<RoomPlayers | null>(null);
    const [newPlayers, setNewPlayers] = useState();

    const [phrase, setPhrase] = useState('');

    const [cu, setCu] = useState([]);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const [drawToShow, setDrawToShow] = useState('');
    const [phraseToDraw, setPhraseToDraw] = useState('');

    const [activeInitial, setActiveInitial] = useState(1);
    const [activeDraw, setActiveDraw] = useState(1);
    const [activePhrase, setActivePhrase] = useState(1);
    const [activeResult, setActiveResult] = useState(0);

    let tentativas = 0;
    const [firstStart, setFirstStart] = useState(0);

    const [admin, setAdmin] = useState(false);
    const [showAdm, setShowAdm] = useState(false);
    const [admNick, setAdmNick] = useState('');

    const history = useHistory();

    const handleLogOffButton = useCallback(async () => {
        return Promise.resolve(exit({ room_id: room_id ?? '', player_id: user_id ?? '' }))
            .then(() => logoff({ user_id: user_id ?? '' }))
            .then(() => {
                localStorage.clear();
                socket.emit('updateRoomPlayers', room_id);
                history.push('/');
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        api.get<Room>(`/room/${room_id}`).then((response) => {
            const sala = response.data;
            setRoom(sala);
        });
    }, []);
    async function getUser() {
        const response = await api.get<User>(`/user/${user_id}`);
        console.log('user do response: ', response.data);

        setUser(response.data);
    }

    // async function getRoom() {
    //     const response = await api.get<Room>(`/room/${room_id}`);
    //     console.log('room do response: ', response.data);

    //     setRoom(response.data);
    // }

    async function getPlayers() {
        const response = await api.get<RoomPlayers>(`/room/${room_id}/players`);
        const room_players = response.data;

        setPlayers(room_players);
    }
    useEffect(() => {
        // getRoom();
        getUser();
        getPlayers();

        console.log(room);
        console.log(user);
        console.log(players);
    }, []);

    useEffect(() => {
        setAdmNick(room?.room_adm.username);
    }, [room]);

    useEffect(() => {
        if (room && room.room_adm_id == user_id) {
            localStorage.setItem('isAdmin', 'true');
            setAdmin((previous) => !previous);
            console.log('admin foi setado pra true');
        } else {
            localStorage.setItem('isAdmin', 'false');
        }
    }, [user]);

    useEffect(() => {
        console.log('admin foi alterado para ', admin);
    }, [admin]);

    useEffect(() => {
        socket.on('messageReceived', async (data: Message) => {
            setMessages((messages: Message[]) => [...messages, data]);
        });

        socket.on('updatePlayers', async (data) => {
            console.log('updateplayers data: ', data);

            setPlayers(data);
        });

        socket.on('receiveRound', async (data: ReceivingRound) => {
            if (data.receiver_id == user_id) {
                switch (data.type) {
                    case EnumRoundType.PHRASE:
                        setPhrases((phrases) => [
                            ...phrases,
                            { content: data.content, match_id: data.match_id, id: phrases.length },
                        ]);
                        setPhraseToDraw(data.content);
                        setActiveDraw(1);
                        break;

                    case EnumRoundType.DRAW:
                        setDraws((draws) => [
                            ...draws,
                            { content: data.content, match_id: data.match_id, id: phrases.length },
                        ]);
                        setDrawToShow(data.content);
                        setActivePhrase(1);
                        break;
                    default:
                        break;
                }
            }
        });

        socket.on('endMatch', (data: EndMatch) => {
            console.log(room);
            console.log(user);
            console.log(players);
            console.log('tentativas: ', tentativas);
            tentativas += 1;
            const isadmin = localStorage.getItem('isAdmin');
            console.log(`partida ${data.match_id} acabou`);
            console.log('rounds: ', data.rounds);

            setResults([...results, data.rounds]);
            console.log('results: ', results);

            console.log('admin: ', isadmin);

            console.log('room do endmatch: ', room);

            if (isadmin == 'true') {
                setShowAdm(true);
                console.log('show admin foi setado pra true');
            }

            console.log('showadm: ', showAdm);
            setActiveInitial(1);
        });

        socket.on('msgToClient', (message: string) => {
            alert('Mensagem recebida: ' + message);
        });
    }, []);

    // useEffect(() => {
    //     if (!nickname || !token) {
    //         history.push('/');
    //     }
    //     api.get('user?roomCode='+roomCode)
    //         .then(response => {
    //             setPlayers(response.data)
    //         });
    // }, [newPlayers]);

    // useEffect(() => {
    // socket.on('login', async data => {

    //     if (response.data.valid === true) {
    //         setAdmin(tqrue);
    //         setFirstStart(1);
    //     };
    //     setNewPlayers(data.nickname);
    //     setAdmNick(data.admNick);
    // });

    // socket.on('newAdmin', async data => {
    //     const response = await api.post('checkToken', { token: token, id: data.idAdm });
    //     if (response.data.valid === true) {
    //         setAdmin(true);
    //         socket.emit('sendMessage', { message: " é o novo Admin", author: nickname });
    //     };
    //     setAdmNick(data.admNick);
    // });

    // socket.on('emote-sound', idEmote => {
    //     let emote = null;
    //     for (const sound of soundsList) {
    //         if (sound.idSound === idEmote) emote = sound.sound;
    //     };
    //     const audio = new Audio(emote);
    //     audio.volume = 0.225;
    //     audio.play();
    // });

    // socket.on('render', async data => {
    //     const response = await api.post('checkToken', { token: token, id: data.id_receiver });
    //     if (response.data.valid === true) {
    //         if (data.type === 'phrase') {
    //             setPhrases(phrases => [...phrases, { content: data.content, idGame: data.id_game }]);
    //         } else {
    //             setDraws(draws => [...draws, { content: data.content, idGame: data.id_game }]);
    //         };
    //     };
    //     if (data.last === true) {
    //         const response = await api.post('checkToken', { token: token, id: data.admId });
    //         if (response.data.valid === true) {
    //             setAdmin(true);
    //             setShowAdm(1);
    //         };
    //         const result = await api.post('getResult', { idGame: data.id_game });
    //         setResults(results => [...results, result.data]);
    //     };
    // });

    // socket.on('showNext', (data) => {
    //     setCu((cu) => [...cu, data]);
    // });

    // socket.on('restart-game', (data) => {
    //     setActiveInitial(1);
    // });
    // }, []);

    // useEffect(() => {
    //     if (phrases.length !== 0) {
    //         setPhraseToDraw(phrases[0].content);
    //         setActiveDraw(1);
    //     }
    //     else {
    //         setActiveDraw(0);
    //     }
    // }, [phrases]);

    // useEffect(() => {
    //     if (draws.length !== 0) {
    //         setDrawToShow(draws[0].content);
    //         setActivePhrase(1);
    //     }
    //     else {
    //         setActivePhrase(0);
    //     }
    // }, [draws]);

    // useEffect(() => {
    //     if (results.length !== 0) {
    //         setActiveResult(1);
    //         if (secondaryResults.length !== results[0].length) {
    //             setSecondaryResults(secondaryResults => [results[0][secondaryResults.length], ...secondaryResults]);
    //         } else {
    //             results.splice(0, 1);
    //             setResults(results);
    //             setSecondaryResults([]);
    //             if (results.length === 0) {
    //                 setActiveResult(0);
    //             };
    //         };
    //     };
    // }, [cu]);

    function handleEmote(idEmote: any) {
        // socket.emit('click-emote', idEmote);
    }

    async function handleCreateGame() {
        try {
            if (phrase.length === 0) {
                alert('frase vazia piá? tá loco né só pode');
            } else {
                return Promise.resolve(
                    createMatch({ room_id: room_id ?? '', match_adm_id: user_id ?? '', match_id: uuidv4() }),
                )
                    .then(async (match: Match) => {
                        await createRound({
                            content: phrase,
                            match_id: match.id,
                            sender_id: user_id ?? '',
                            type: EnumRoundType.PHRASE,
                            receiver_id: match.sort.split(',')[1],
                        });
                        socket.emit('sendNextRound', match.id);
                    })
                    .then(() => {
                        setActiveInitial(0);
                        setPhrase('');
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        } catch (err) {
            alert(err);
        }
    }

    function deleteLastPhrase(id: number) {
        setPhrases(phrases.filter((phrase_filter) => phrase_filter.id != id));
    }

    function deleteLastDraw(id: number) {
        setDraws(draws.filter((draw_filter) => draw_filter.id != id));
    }

    async function sendMessage() {
        if (message.length > 0 && message.length <= 50) {
            socket.emit('sendMessage', { text: message, author: nickname });
            setMessage('');
        }
    }

    function emitNext() {
        // socket.emit('emitNext', 'macaco');
    }

    function restartGame() {
        // socket.emit('restart-game', 'macaco');
        setShowAdm(false);
        setFirstStart(0);
    }

    return (
        <div className="main-container">
            <div className="side">
                <div className="user-data">
                    <h2>Nick: {nickname}</h2>
                    <h2>Room: {roomCode}</h2>
                </div>
                <div className="red-button">
                    <button type="submit" onClick={() => handleLogOffButton()}>
                        Deslogar!
                    </button>
                </div>
                <div className="chat">
                    <h1>
                        É ADM? : {admin ? 'sim' : 'nao'} b: {b ? 'sim' : 'nao'}
                    </h1>
                    <h2>Chat dos brabo</h2>
                    <div className="messages">
                        {messages.map((m) => (
                            <a className="m">
                                <strong>{m.author + ': '}</strong>
                                {m.text}
                            </a>
                        ))}
                    </div>
                    <input
                        maxLength={50}
                        type="text"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></input>
                    <button type="submit" onClick={() => sendMessage()}>
                        Enviar mensagem
                    </button>
                </div>
            </div>
            <div className="content">
                {/* <div className="object" style={{ display: 'flex' }}> */}
                <div className="object" style={activeInitial === 0 ? { display: 'none' } : { display: 'flex' }}>
                    <input
                        type="text"
                        placeholder="Digite alguma coisa"
                        name="phrase"
                        id="phrase"
                        onChange={(e) => setPhrase(e.target.value)}
                        value={phrase}
                    />
                    <button type="submit" onClick={() => handleCreateGame()}>
                        Enviar!
                    </button>
                </div>

                {firstStart === 0 ? null : (
                    <div className="object">
                        {results.length === 0 ? (
                            <button onClick={() => restartGame()}>Novo jogo</button>
                        ) : (
                            <button onClick={() => emitNext()}>Mostrar próximo</button>
                        )}
                    </div>
                )}

                <h1>Voce tem {phrases.length} frases para desenhar</h1>
                {phrases.map((phrase) => (
                    <div className="object">
                        <Draw
                            sender_id={user_id}
                            phrase={phrase.content}
                            match_id={phrase.match_id}
                            callbackParent={() => deleteLastPhrase(phrase.id)}
                        />
                    </div>
                ))}

                <h1>Voce tem {draws.length} desenhos para descrever</h1>
                {draws.map((draw) => (
                    <div className="object">
                        <Answer
                            sender_id={user_id}
                            draw={draw.content}
                            callbackParent={() => deleteLastDraw(draw.id)}
                            match_id={draw.match_id}
                        />
                    </div>
                ))}

                {showAdm ? (
                    <div className="object">
                        <h1>Voce tem {results.length} jogos para apresentar</h1>
                        {results.length === 0 ? (
                            <button onClick={() => restartGame()}>Novo jogo</button>
                        ) : (
                            <button onClick={() => emitNext()}>Mostrar próximo</button>
                        )}
                    </div>
                ) : null}

                <div className="show-result">
                    {activeResult === 0
                        ? null
                        : secondaryResults.length > 0
                        ? secondaryResults.map((result) =>
                              result.type === 'draw' ? (
                                  <div className="render">
                                      <h2 className="name">{result.sender.username + ': '}</h2>
                                      <ShowDraw draw={result.content} />
                                  </div>
                              ) : (
                                  <div className="render">
                                      <div className="inline">
                                          <h2 className="name">{result.sender.username + ': '}</h2>
                                          <h2 className="phrase-content">{result.content}</h2>
                                      </div>
                                  </div>
                              ),
                          )
                        : null}
                </div>
            </div>

            <div className="side">
                <div className="users">
                    <h1>Users</h1>
                    <h1>Showadm {showAdm ? 'sim' : 'nao'}</h1>
                    <div className="players">
                        <ul>
                            {players?.users.map((player) => (
                                <li key={player.user_id}>
                                    {admNick === player.user.username ? (
                                        <span className="admin">{player.user.username} </span>
                                    ) : (
                                        <span className="player">{player.user.username} </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="emotes">
                    <div className="emotes-title">
                        <h1>Emotes</h1>
                    </div>
                    <div className="emotes-button">
                        <button className="emote-button" onClick={() => handleEmote(1)}>
                            <img src={eoqIcon} alt="eoq" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(2)}>
                            <img src={chavesIcon} alt="chaves-aiqburro" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(3)}>
                            <img src={cavaloIcon} alt="cavalo" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(4)}>
                            <img src={faustaoIcon} alt="faustao-errou" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(5)}>
                            <img src={facepalmIcon} alt="facepalm" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(6)}>
                            <img src={macacoIcon} alt="macaco" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(7)}>
                            <img src={peidoIcon} alt="peido" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(8)}>
                            <img src={rojaoIcon} alt="rojao" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(9)}>
                            <img src={tanIcon} alt="tan-tan-taaan" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(10)}>
                            <img src={tanIcon} alt="tan-tan-taaan" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(11)}>
                            <img src={surpriseIcon} alt="surprise-motherf*cker" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(12)}>
                            <img src={ruimIcon} alt="ruim-piorou" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
