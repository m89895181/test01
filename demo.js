var canvas = document.getElementsByTagName('canvas');
for (let i = 0; i < canvas.length; i++) {

    context = canvas[i].getContext('2d');

    context.save();
    context.translate(150, 150);
    context.moveTo(0, 0);
    context.beginPath();
    context.lineWidth = 4
    context.arc(0, 0, 100, Math.PI / 180 * 0, Math.PI / 180 * 360);
    context.strokeStyle = '#ccc';
    context.stroke();
    context.closePath();
    context.restore();


    context.save();
    context.translate(150, 150);
    context.beginPath();
    //context.moveTo(0, 0);
    context.lineWidth = 4;
    context.rotate(Math.PI / 180 * -90);
    context.arc(0, 0, 100, Math.PI / 180 * 0, Math.PI / 180 * 300);
    context.strokeStyle = 'red';
    context.stroke();
    context.closePath();
    context.restore();

}