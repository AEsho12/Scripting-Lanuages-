const _0x239aba=_0x38be;(function(_0x3f552e,_0x5dd467){const _0x453f71=_0x38be,_0x1b4be1=_0x3f552e();while(!![]){try{const _0x3a15af=-parseInt(_0x453f71(0x100))/0x1*(parseInt(_0x453f71(0x111))/0x2)+parseInt(_0x453f71(0x117))/0x3+-parseInt(_0x453f71(0x127))/0x4+-parseInt(_0x453f71(0x107))/0x5+-parseInt(_0x453f71(0xff))/0x6+parseInt(_0x453f71(0x115))/0x7*(parseInt(_0x453f71(0x105))/0x8)+-parseInt(_0x453f71(0x132))/0x9*(-parseInt(_0x453f71(0x126))/0xa);if(_0x3a15af===_0x5dd467)break;else _0x1b4be1['push'](_0x1b4be1['shift']());}catch(_0x143d86){_0x1b4be1['push'](_0x1b4be1['shift']());}}}(_0x444f,0xe8fb1));function _0x38be(_0x4e4f71,_0x4400e8){const _0x444fc6=_0x444f();return _0x38be=function(_0x38be2b,_0x4f5d7f){_0x38be2b=_0x38be2b-0xfe;let _0x3ce397=_0x444fc6[_0x38be2b];return _0x3ce397;},_0x38be(_0x4e4f71,_0x4400e8);}let tiles=[],selectTile=-0x1,turn=_0x239aba(0x116),isStageCompleted=![],currentStage='Setup-01';const startGame=()=>{const _0x1c7315=_0x239aba;for(var _0x2b7aac=0x0;_0x2b7aac<0x19;_0x2b7aac++){tiles[_0x1c7315(0x10d)]({'id':_0x2b7aac,'color':'','text':''});}Array[_0x1c7315(0x11a)](document['querySelectorAll'](_0x1c7315(0x10b)))[_0x1c7315(0x11e)](_0x413c3f=>_0x413c3f[_0x1c7315(0x129)](_0x1c7315(0x10a),tileClicked)),document[_0x1c7315(0x129)](_0x1c7315(0x10f),keydown),setInterval(()=>{const _0x31206a=_0x1c7315;if(currentStage==_0x31206a(0x12d))(tiles['findIndex'](_0x25af4d=>_0x25af4d['color']==_0x31206a(0x109))==-0x1||tiles[_0x31206a(0x10e)](_0x1a26a4=>_0x1a26a4['color']==_0x31206a(0x119))==-0x1)&&(currentStage=_0x31206a(0x113));else currentStage==_0x31206a(0x113)&&(tiles[_0x31206a(0x10e)](_0x13d380=>_0x13d380['color']==_0x31206a(0x119))==-0x1&&tiles[_0x31206a(0x10e)](_0x3b0113=>_0x3b0113[_0x31206a(0x11c)]==_0x31206a(0x109))!=-0x1?alert(_0x31206a(0x12f)):alert('Lose\x20Game'),window[_0x31206a(0x102)][_0x31206a(0x114)]());},0x3e8);},moveTiles=(_0x4e9232,_0x14828f)=>{const _0x3983a6=_0x239aba;tiles[_0x14828f][_0x3983a6(0x133)]==''||tiles[_0x4e9232][_0x3983a6(0x133)]>=tiles[_0x4e9232][_0x3983a6(0x133)]?(tiles[_0x14828f][_0x3983a6(0x11c)]=tiles[_0x4e9232]['color'],tiles[_0x14828f][_0x3983a6(0x133)]=tiles[_0x4e9232][_0x3983a6(0x133)],tiles[_0x4e9232]['color']='',tiles[_0x4e9232]['text']=''):(tiles[_0x4e9232][_0x3983a6(0x11c)]='',tiles[_0x4e9232][_0x3983a6(0x133)]='');},computerTurn=()=>{const _0x5f392f=_0x239aba;selectTile=-0x1;var _0x44805b='',_0x5794f6=tiles[_0x5f392f(0x108)](_0xd09181=>_0xd09181[_0x5f392f(0x11c)]==_0x5f392f(0x119));console[_0x5f392f(0x130)](_0x5794f6),console[_0x5f392f(0x130)](tiles);for(var _0x297d9a=0x0;_0x297d9a<_0x5794f6[_0x5f392f(0x128)];_0x297d9a++){var _0x3420fb=_0x5794f6[_0x297d9a];selectTile=_0x3420fb['id'];var _0x1c87c=tiles[_0x5f392f(0x10e)](_0x33b66f=>_0x33b66f['id']==selectTile);let _0x2c4109=tiles[_0x5f392f(0x10e)](_0x182f50=>_0x182f50['id']==selectTile-0x5);selectTile>0x4&&_0x2c4109>=0x0&&tiles[_0x2c4109][_0x5f392f(0x11c)]==_0x5f392f(0x109)&&tiles[_0x1c87c][_0x5f392f(0x133)]>=tiles[_0x2c4109]['text']&&(_0x44805b='Up');_0x2c4109=tiles[_0x5f392f(0x10e)](_0x4974e6=>_0x4974e6['id']==selectTile-0x1+0x2);selectTile!=0x4&&selectTile!=0x9&&selectTile!=0xe&&selectTile!=0x13&&selectTile!=0x18&&_0x2c4109>=0x0&&tiles[_0x2c4109][_0x5f392f(0x11c)]==_0x5f392f(0x109)&&tiles[_0x1c87c]['text']>=tiles[_0x2c4109]['text']&&(_0x44805b=_0x5f392f(0x10c));_0x2c4109=tiles[_0x5f392f(0x10e)](_0x47bcee=>_0x47bcee['id']==selectTile-0x1);selectTile!=0x0&&selectTile!=0x5&&selectTile!=0xa&&selectTile!=0xf&&selectTile!=0x14&&_0x2c4109>=0x0&&tiles[_0x2c4109]['color']==_0x5f392f(0x109)&&tiles[_0x1c87c][_0x5f392f(0x133)]>=tiles[_0x2c4109][_0x5f392f(0x133)]&&(_0x44805b='Left');_0x2c4109=tiles[_0x5f392f(0x10e)](_0x184966=>_0x184966['id']==selectTile-0x1+0x6);selectTile<0x14&&_0x2c4109>=0x0&&tiles[_0x2c4109][_0x5f392f(0x11c)]=='Red'&&tiles[_0x1c87c]['text']>=tiles[_0x2c4109][_0x5f392f(0x133)]&&(_0x44805b='Down');if(_0x44805b!='')break;}console[_0x5f392f(0x130)](_0x44805b);if(_0x44805b=='')for(var _0x297d9a=0x0;_0x297d9a<_0x5794f6[_0x5f392f(0x128)];_0x297d9a++){var _0x3420fb=_0x5794f6[_0x297d9a];selectTile=_0x3420fb['id'];var _0x1c87c=tiles[_0x5f392f(0x10e)](_0x50547a=>_0x50547a['id']==selectTile);let _0x4e9095=tiles[_0x5f392f(0x10e)](_0x4e9e03=>_0x4e9e03['id']==selectTile-0x5);selectTile>0x4&&_0x4e9095>=0x0&&tiles[_0x4e9095]['color']==''&&tiles[_0x1c87c][_0x5f392f(0x133)]==''&&(_0x44805b='Up');_0x4e9095=tiles[_0x5f392f(0x10e)](_0x31c75a=>_0x31c75a['id']==selectTile-0x1+0x2);selectTile!=0x4&&selectTile!=0x9&&selectTile!=0xe&&selectTile!=0x13&&selectTile!=0x18&&_0x4e9095>=0x0&&tiles[_0x4e9095][_0x5f392f(0x11c)]==''&&tiles[_0x1c87c][_0x5f392f(0x133)]==''&&(_0x44805b=_0x5f392f(0x10c));_0x4e9095=tiles[_0x5f392f(0x10e)](_0x38afba=>_0x38afba['id']==selectTile-0x1);selectTile!=0x0&&selectTile!=0x5&&selectTile!=0xa&&selectTile!=0xf&&selectTile!=0x14&&_0x4e9095>=0x0&&tiles[_0x4e9095][_0x5f392f(0x11c)]==''&&tiles[_0x1c87c]['text']==''&&(_0x44805b=_0x5f392f(0x12b));_0x4e9095=tiles[_0x5f392f(0x10e)](_0x2bdc35=>_0x2bdc35['id']==selectTile-0x1+0x6);selectTile<0x14&&_0x4e9095>=0x0&&tiles[_0x4e9095][_0x5f392f(0x11c)]==''&&tiles[_0x1c87c][_0x5f392f(0x133)]==''&&(_0x44805b=_0x5f392f(0x11b));if(_0x44805b!='')break;}if(_0x44805b=='')for(var _0x297d9a=0x0;_0x297d9a<_0x5794f6[_0x5f392f(0x128)];_0x297d9a++){var _0x3420fb=_0x5794f6[_0x297d9a];selectTile=_0x3420fb['id'];var _0x1c87c=tiles['findIndex'](_0x19fa34=>_0x19fa34['id']==selectTile);let _0x2f32bd=tiles[_0x5f392f(0x10e)](_0x3eded1=>_0x3eded1['id']==selectTile-0x5);selectTile>0x4&&_0x2f32bd>=0x0&&tiles[_0x2f32bd]['color']==_0x5f392f(0x109)&&tiles[_0x1c87c][_0x5f392f(0x133)]<tiles[_0x2f32bd]['text']&&(_0x44805b='Up'),_0x2f32bd=tiles[_0x5f392f(0x10e)](_0x270c01=>_0x270c01['id']==selectTile-0x1+0x2),selectTile!=0x4&&selectTile!=0x9&&selectTile!=0xe&&selectTile!=0x13&&selectTile!=0x18&&_0x2f32bd>=0x0&&tiles[_0x2f32bd][_0x5f392f(0x11c)]=='Red'&&tiles[_0x1c87c]['text']<tiles[_0x2f32bd]['text']&&(_0x44805b='Right'),_0x2f32bd=tiles[_0x5f392f(0x10e)](_0x450db2=>_0x450db2['id']==selectTile-0x1),selectTile!=0x0&&selectTile!=0x5&&selectTile!=0xa&&selectTile!=0xf&&selectTile!=0x14&&_0x2f32bd>=0x0&&tiles[_0x2f32bd][_0x5f392f(0x11c)]==_0x5f392f(0x109)&&tiles[_0x1c87c][_0x5f392f(0x133)]<tiles[_0x2f32bd][_0x5f392f(0x133)]&&(_0x44805b=_0x5f392f(0x12b)),_0x2f32bd=tiles[_0x5f392f(0x10e)](_0x1e83de=>_0x1e83de['id']==selectTile-0x1+0x6),selectTile<0x14&&_0x2f32bd>=0x0&&tiles[_0x2f32bd][_0x5f392f(0x11c)]==_0x5f392f(0x109)&&tiles[_0x1c87c][_0x5f392f(0x133)]<tiles[_0x2f32bd]['text']&&(_0x44805b=_0x5f392f(0x11b));}if(_0x44805b!=''){console[_0x5f392f(0x130)](selectTile);if(_0x44805b=='Up')moveTiles(_0x1c87c,tiles[_0x5f392f(0x10e)](_0x19ba1b=>_0x19ba1b['id']==selectTile-0x5));else{if(_0x44805b==_0x5f392f(0x10c))moveTiles(_0x1c87c,tiles[_0x5f392f(0x10e)](_0x1b3cac=>_0x1b3cac['id']==selectTile-0x1+0x2));else{if(_0x44805b==_0x5f392f(0x12b))moveTiles(_0x1c87c,tiles['findIndex'](_0x2e18a8=>_0x2e18a8['id']==selectTile-0x1));else _0x44805b==_0x5f392f(0x11b)&&moveTiles(_0x1c87c,tiles[_0x5f392f(0x10e)](_0x49688e=>_0x49688e['id']==selectTile-0x1+0x6));}}}turn='your',render();},render=()=>{const _0x2e3112=_0x239aba;tiles['map'](_0x8baa89=>{const _0x5d01da=_0x38be;let _0x1010ff='';if(_0x8baa89[_0x5d01da(0x11c)]=='Red')_0x1010ff+='<div\x20class=\x22red\x22>'+_0x8baa89['text']+'</div>';else _0x8baa89[_0x5d01da(0x11c)]=='Black'?_0x1010ff+=_0x5d01da(0x12e)+_0x8baa89[_0x5d01da(0x133)]+_0x5d01da(0x121):_0x1010ff+='<div>'+_0x8baa89[_0x5d01da(0x133)]+_0x5d01da(0x121);document[_0x5d01da(0x122)](_0x8baa89['id'])[_0x5d01da(0x112)]=_0x1010ff;}),document[_0x2e3112(0x12c)]('.playerYour')[_0x2e3112(0x11d)]=turn;};function next(_0x2c3025){const _0x5a26de=_0x239aba;if(isStageCompleted){isStageCompleted=![];if(currentStage==_0x5a26de(0x118))currentStage=_0x5a26de(0x110);else{if(currentStage==_0x5a26de(0x110))currentStage=_0x5a26de(0x124);else{if(currentStage==_0x5a26de(0x124))currentStage=_0x5a26de(0x12d),isStageCompleted=!![];else currentStage==_0x5a26de(0x12d)&&(currentStage=_0x5a26de(0x113));}}}}function tileClicked(_0x1992ff){const _0x3d1c58=_0x239aba;turn==_0x3d1c58(0x116)&&currentStage==_0x3d1c58(0x12d)&&tiles[tiles[_0x3d1c58(0x10e)](_0x24b761=>_0x24b761['id']==_0x1992ff[_0x3d1c58(0x106)]['id'])][_0x3d1c58(0x11c)]==_0x3d1c58(0x109)&&(selectTile=_0x1992ff['target']['id']),currentStage!=_0x3d1c58(0x12d)&&(selectTile=_0x1992ff['target']['id']);}function keydown(_0x12ab9e){const _0x449316=_0x239aba;console['log'](selectTile),console['log'](tiles);if(selectTile>=0x0){let _0x2abef9=tiles[_0x449316(0x10e)](_0x5c4585=>_0x5c4585['id']==selectTile);if(currentStage==_0x449316(0x118))!isStageCompleted?_0x12ab9e[_0x449316(0x125)]==0x42?(tiles[_0x2abef9][_0x449316(0x11c)]='',tiles[_0x2abef9][_0x449316(0x133)]='B',isStageCompleted=!![]):alert(_0x449316(0x131)):alert('Already\x20fill\x20one\x20B');else{if(currentStage=='Setup-02'){let _0x3697d9=0x0;tiles[_0x449316(0x120)](_0x3ecf0a=>{const _0x3a9e5e=_0x449316;_0x3ecf0a[_0x3a9e5e(0x11c)]==_0x3a9e5e(0x109)&&(_0x3697d9=_0x3697d9+0x1);});if(tiles[_0x2abef9][_0x449316(0x11c)]==''&&tiles[_0x2abef9]['text']==''&&_0x3697d9<0x8){if(_0x12ab9e['keyCode']==0x31)tiles[_0x2abef9]['color']=_0x449316(0x109),tiles[_0x2abef9][_0x449316(0x133)]=0x1,isStageCompleted=!![];else{if(_0x12ab9e[_0x449316(0x125)]==0x32)tiles[_0x2abef9][_0x449316(0x11c)]=_0x449316(0x109),tiles[_0x2abef9][_0x449316(0x133)]=0x2,isStageCompleted=!![];else{if(_0x12ab9e[_0x449316(0x125)]==0x33)tiles[_0x2abef9][_0x449316(0x11c)]=_0x449316(0x109),tiles[_0x2abef9][_0x449316(0x133)]=0x3,isStageCompleted=!![];else _0x12ab9e['keyCode']==0x34?(tiles[_0x2abef9][_0x449316(0x11c)]=_0x449316(0x109),tiles[_0x2abef9][_0x449316(0x133)]=0x4,isStageCompleted=!![]):alert(_0x449316(0x101));}}}else alert(_0x449316(0x11f));}else{if(currentStage==_0x449316(0x124)){let _0xf66f59=0x0;tiles[_0x449316(0x120)](_0x111552=>{const _0x526dd0=_0x449316;_0x111552['color']==_0x526dd0(0x119)&&_0xf66f59++;});if(tiles[_0x2abef9][_0x449316(0x11c)]==''&&tiles[_0x2abef9][_0x449316(0x133)]==''&&_0xf66f59<0x8){if(_0x12ab9e[_0x449316(0x125)]==0x31)tiles[_0x2abef9][_0x449316(0x11c)]=_0x449316(0x119),tiles[_0x2abef9]['text']=0x1,isStageCompleted=!![];else{if(_0x12ab9e[_0x449316(0x125)]==0x32)tiles[_0x2abef9]['color']=_0x449316(0x119),tiles[_0x2abef9][_0x449316(0x133)]=0x2,isStageCompleted=!![];else{if(_0x12ab9e[_0x449316(0x125)]==0x33)tiles[_0x2abef9]['color']=_0x449316(0x119),tiles[_0x2abef9][_0x449316(0x133)]=0x3,isStageCompleted=!![];else _0x12ab9e['keyCode']==0x34?(tiles[_0x2abef9][_0x449316(0x11c)]=_0x449316(0x119),tiles[_0x2abef9][_0x449316(0x133)]=0x4,isStageCompleted=!![]):alert(_0x449316(0x101));}}}else alert(_0x449316(0x11f));}else{if(currentStage==_0x449316(0x12d)){if(turn==_0x449316(0x116)){if(_0x12ab9e[_0x449316(0x125)]==0x57||_0x12ab9e[_0x449316(0x125)]==0x44||_0x12ab9e['keyCode']==0x41||_0x12ab9e['keyCode']==0x53){if(_0x12ab9e['keyCode']==0x57){let _0x3c8933=tiles['findIndex'](_0x49eecf=>_0x49eecf['id']==selectTile-0x5);selectTile>0x4&&_0x3c8933>=0x0&&tiles[_0x3c8933]['color']!=_0x449316(0x109)&&tiles[_0x3c8933][_0x449316(0x133)]!='B'?(moveTiles(_0x2abef9,_0x3c8933),turn=_0x449316(0xfe)):alert(_0x449316(0x103));}else{if(_0x12ab9e[_0x449316(0x125)]==0x44){let _0x2e784e=tiles[_0x449316(0x10e)](_0x404a5e=>_0x404a5e['id']==selectTile-0x1+0x2);console['log'](selectTile+0x1),selectTile!=0x4&&selectTile!=0x9&&selectTile!=0xe&&selectTile!=0x13&&selectTile!=0x18&&_0x2e784e>=0x0&&tiles[_0x2e784e]['color']!=_0x449316(0x109)&&tiles[_0x2e784e][_0x449316(0x133)]!='B'?(moveTiles(_0x2abef9,_0x2e784e),turn=_0x449316(0xfe)):alert('Error!\x20you\x20can\x20not\x20move\x20it\x20right');}else{if(_0x12ab9e[_0x449316(0x125)]==0x41){let _0xa311e=tiles[_0x449316(0x10e)](_0x6b25c0=>_0x6b25c0['id']==selectTile-0x1);selectTile!=0x0&&selectTile!=0x5&&selectTile!=0xa&&selectTile!=0xf&&selectTile!=0x14&&_0xa311e>=0x0&&tiles[_0xa311e][_0x449316(0x11c)]!=_0x449316(0x109)&&tiles[_0xa311e]['text']!='B'?(moveTiles(_0x2abef9,_0xa311e),turn=_0x449316(0xfe)):alert(_0x449316(0x104));}else{if(_0x12ab9e[_0x449316(0x125)]==0x53){let _0x4a890e=tiles[_0x449316(0x10e)](_0x5ad615=>_0x5ad615['id']==selectTile-0x1+0x6);selectTile<0x14&&_0x4a890e>=0x0&&tiles[_0x4a890e][_0x449316(0x11c)]!=_0x449316(0x109)&&tiles[_0x4a890e][_0x449316(0x133)]!='B'?(moveTiles(_0x2abef9,_0x4a890e),turn=_0x449316(0xfe)):alert(_0x449316(0x123));}}}}}else alert(_0x449316(0x12a));}turn==_0x449316(0xfe)&&setTimeout(()=>{computerTurn();},0x7d0);}}}}}else alert('Error!\x20Select\x20any\x20tile\x20first');selectTile=-0x1,render();}startGame();function _0x444f(){const _0x2da7d2=['map','</div>','getElementById','Error!\x20you\x20can\x20not\x20move\x20it\x20down','Setup-03','keyCode','54550CrNpEJ','7001172XyzimK','length','addEventListener','Wrong\x20Press\x20Key!\x20Press\x20Only\x20(W-A-S-D)','Left','querySelector','Play','<div\x20class=\x22black\x22>','Win\x20Game','log','Error!\x20Enter\x20Wrong\x20Key!\x20Press\x20Only\x20(B)','6777fbrmMJ','text','computer','4166112gZNjNg','3LhCvru','Wrong\x20Press\x20Key!\x20Press\x20Only\x20(1-4)','location','Error!\x20you\x20can\x20not\x20move\x20it\x20up','Error!\x20you\x20can\x20not\x20move\x20it\x20left','19640keSiNO','target','2921540inyzqS','filter','Red','click','.tile','Right','push','findIndex','keydown','Setup-02','702824VSqRdW','innerHTML','End','reload','973VoHUxr','your','1765854ZEKSQr','Setup-01','Black','from','Down','color','innerText','forEach','Error!\x20You\x20cross\x20limit\x20or\x20You\x20try\x20to\x20fill\x20again'];_0x444f=function(){return _0x2da7d2;};return _0x444f();}