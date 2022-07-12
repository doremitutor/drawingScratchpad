window.onload=setUp;
function setUp(){
	setCtx();
//	drawScales();
//	draw2rulers();
//	drawSinusoid(50, 500, 900, 150, 1, true);
	drawHarmonicScale();
}
function drawScales(){
	var topMargin=60;
	var sideMargin=40;
	var point=new Array(25);
	var diatPoint=[0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24];
	var r=22;
	var y=new Array(7);
	for(var i=0; i<y.length; i++){
		y[i]=topMargin+90*i;
	}
	for(var i=0; i<y.length; i++){
		for(var j=0; j<point.length; j++){
			point[j]= new Point(sideMargin+(canvas.width-2*sideMargin)/24*j, y[i]);
		}
		ctx.lineWidth=2;
		for(var j=0; j<point.length; j++){
			ctx.beginPath();
			ctx.moveTo(point[j].x, y[i]-5);
			ctx.lineTo(point[j].x, y[i]+5);
			ctx.stroke()
		}
		ctx.stroke();
		ctx.beginPath();
		for(var j=0; j<diatPoint.length; j++){
			var p=point[diatPoint[j]];
			ctx.moveTo(p.x+r, y[i]);
			ctx.arc(p.x, p.y, r, 0, 2*Math.PI, true);
		}
		ctx.fillStyle="pink";
		ctx.fill();
		ctx.stroke();
		ctx.fillStyle="#3b2c1d";
		ctx.textAlign='center';
		ctx.textBaseline='middle';
		ctx.font='bold 24px sans-serif';
		var name=["Do", "Re", "Mi", "Fa", "Sol", "La", "Si", "Do", "Re", "Mi", "Fa", "Sol", "La", "Si", "Do"];
		//var name= new Array('Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do');
		for(var j=0; j<diatPoint.length; j++){
			var p=point[diatPoint[j]];
			ctx.fillText(name[j], p.x, p.y);
		}				
		function Point(x, y){
			this.x=x;
			this.y=y;
		}
	}
}
function draw2rulers(){	
	drawBase2logRuler(100, 25, 800, 40, 1);//
	drawBase2logRuler(100, 50, 800, 40, 2);//
	drawBase2logRuler(100, 75, 800, 40, 4);//
	drawBase2logRuler(100, 100, 800, 40, 8);//
	drawBase2logRuler(100, 125, 800, 40, 16);//
	drawBase2logRuler(100, 150, 800, 40, 32);//
	drawBase2logRuler(100, 175, 800, 40, 64);//
	drawBase2logRuler(100, 200, 800, 40, 128);//
}
function drawHarmonicScale(){
	var horizMargin=50;
	var labelWidth=180;
	var x=horizMargin+labelWidth;
	var width=canvas.width-2*horizMargin-labelWidth;
	var yNonTonic=100;
	var yTonic=200;
	var yNames=365;
	var yMarks=320;
	var markHeight=30;
	var yInterMark=255;
	var interMarkHeight=30;
	var yLine=320;
	var yRedLine=370;
	var redLineHeight=120;
	var yRatios=530;
	var yInterStrings=630;
	var yIntervals=680;
	ctx.lineWidth=6;
	ctx.beginPath();
	ctx.moveTo(x, yNonTonic);
	ctx.lineTo(x+width, yNonTonic);
	ctx.moveTo(x, yTonic);
	ctx.lineTo(x+width, yTonic);
	ctx.stroke();
	var font='bold 36px sans-serif';
	ctx.font=font;
	var vertOffset=8;
	ctx.fillText('Texto 1', horizMargin, yNonTonic+vertOffset);
	ctx.fillText('Texto 2', horizMargin, yTonic+vertOffset);
	var nonTonic=[3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15];
	var tonic=['', 1, 2, 4, 8, 16];
	var noteName=['Do', 'Re(2a)', 'Mi(3a)', 'Fa(4a)', 'Sol(5a)', 'La(6a)', 'Si(7a)', 'Do'];
	var noteNamePlain=['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do'];
	//var noteNamePlain=['t�nica', 'supert�nica', 'mediante', 'subdominante', 'dominante', 'submediante', 'sensible', 't�nica'];
	var ratioNat=[1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2];
	var ratioNatString=['1', '9:8', '5:4', '4:3', '3:2', '5:3', '15:8', '2'];
	var log2=[];
	for(var i=0; i<ratioNat.length; i++){
		log2[i]=Math.log2(ratioNat[i]);
	} 
	var ratioInterString=new Array('9:8', '10:9', '16:15', '9:8', '10:9', '9:8', '16:15');
	var intervals=new Array('T', 'T', 'ST', 'T', 'T', 'T', 'ST');
	var unit=width/16;
	var tempX;
	var textXOffset=-6;
	var textYOffset=-25;
	var text;
	var textWidth;
	for(var i=0; i<nonTonic.length; i++){
		textWidth=ctx.measureText(nonTonic[i]).width;
		tempX=x+unit*nonTonic[i];
		drawVertMark(tempX, yNonTonic, markHeight);
		ctx.fillText(nonTonic[i], tempX-textWidth/2, yNonTonic+textYOffset);
	} 
	for(var i=0; i<tonic.length; i++){
		textWidth=ctx.measureText(tonic[i]).width;
		tempX=x+unit*tonic[i];
		drawVertMark(tempX, yTonic, markHeight);
		ctx.fillText(tonic[i], tempX-textWidth/2, yTonic+textYOffset);
	}
	//x=50;
	//width=canvas.width-2*x;
	var markX=new Array();
	for(var i=0; i<noteName.length; i++){
		markX[i]=x+width*log2[i];
	}
	var ratioInterX=new Array();
	for (var i=0; i<markX.length-1; i++){
		ratioInterX[i]=(markX[i]+markX[i+1])/2;
	}
	// draw baseline
	ctx.lineWidth=6;
	ctx.beginPath();
	ctx.moveTo(x, yLine);
	ctx.lineTo(x+width, yLine);
	ctx.stroke();
	// draw names & marks
	var font='bold 32px sans-serif';
	ctx.font=font;
	for(var i=0; i<ratioNat.length; i++){
		tempX=markX[i];
		drawVertMark(tempX, yMarks, markHeight);
		textWidth=ctx.measureText(noteNamePlain[i]).width;
		ctx.fillText(noteNamePlain[i], tempX-textWidth/2, yNames);
	}
	//draw red lines
	ctx.lineWidth=2;
	ctx.strokeStyle='#ff0000';
	ctx.beginPath();
	for(var i=0; i<ratioNat.length; i++){
		tempX=markX[i];
		ctx.moveTo(tempX, yRedLine);
		ctx.lineTo(tempX, yRedLine+redLineHeight);
	}
	ctx.stroke();
	//draw ratios
	var font='bold 36px sans-serif';
	ctx.font=font;	
	for(var i=0; i<ratioNat.length; i++){x+width*log2[i];
		tempX=markX[i];
		textWidth=ctx.measureText(ratioNatString[i]).width;
		ctx.fillText(ratioNatString[i], tempX-textWidth/2, yRatios);
	}
	// draw interMarkx 
	ctx.lineWidth=2;
	ctx.strokeStyle='#000000';
	ctx.beginPath();
	for(var i=0; i<ratioInterX.length; i++){
		if(i==2||i==6)continue;
		tempX=ratioInterX[i];
		ctx.moveTo(tempX, yInterMark);
		ctx.lineTo(tempX, yInterMark+interMarkHeight);
	}
	ctx.stroke();
	// draw interStrinsRatios
	var font='bold 36px sans-serif';
	ctx.font=font;	
	for(var i=0; i<ratioInterString.length; i++){x+width*log2[i];
		tempX=ratioInterX[i];
		textWidth=ctx.measureText(ratioInterString[i]).width;
		ctx.fillText(ratioInterString[i], tempX-textWidth/2, yInterStrings);
	}
	// draw intervals
	var font='bold 40px sans-serif';
	ctx.font=font;		
	for(var i=0; i<intervals.length; i++){x+width*log2[i];
		tempX=ratioInterX[i];
		textWidth=ctx.measureText(intervals[i]).width;
		ctx.fillText(intervals[i], tempX-textWidth/2, yIntervals);
	}	
}
function drawBase2logRuler(x, y, width, unit, freq){
	ctx.lineWidth=1;
	ctx.beginPath();
	ctx.moveTo(x, y+0.5);
	ctx.lineTo(x+width, y+0.5);	
	ctx.stroke();
	var mark=x;
	var i=0;
	var harmFreq;
	var freqLog;
	while(mark<=x+width){
		drawVertMark(mark, y, 10);
		harmFreq=freq*(Math.pow(2, i));
		freqLog=Math.log2(harmFreq);
		mark=x+freqLog*unit;
		i++;
	}
	//;//i<10
}