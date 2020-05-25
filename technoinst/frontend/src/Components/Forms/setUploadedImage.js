function setUploadedImage(event, imgHandler) {
    //event - event от onChange для input, imgHandler - handler(src), который подставляет фотографию
    let input = event.target;
    if (input.files[0]) {
        let reader = new FileReader();

        reader.onload = function (e) {
            imgHandler(e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

export default setUploadedImage;
