export default function getColour(id: string, color_ref: any): undefined|string{

    color_ref = color_ref.filter(function(item: any) {

      return item[0].id == id;
    });

    return(color_ref[0][0].color);
};
