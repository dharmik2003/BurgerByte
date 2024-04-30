export interface Burgertype {
    id:number
    title: string;
    image: string;
    review: number;
    price: number;
    rating: number;
}

export const BurderData: Burgertype[] = [
    { id:1,title:"Classic Burger", image: "https://github.com/dharmik2003/poster_movie/blob/main/New%20folder/b3.png?raw=true", review: 10, price: 99, rating: 1 },
    { id: 2, title:"Classic Zinger Burger", image: "https://github.com/dharmik2003/poster_movie/blob/main/New%20folder/p2.png?raw=true", review: 10, price: 250, rating: 4 },
    { id: 3, title:"Veg Whopper Double Patty", image: "https://github.com/dharmik2003/poster_movie/blob/main/New%20folder/b5.png?raw=true", review: 6, price: 120, rating: 5 },
    { id: 4, title:"Jumbo burger", image: "https://github.com/dharmik2003/poster_movie/blob/main/New%20folder/b6.png?raw=true", review: 3, price: 99, rating: 4 },
    { id: 5, title: "Veg Whopper", image: "https://github.com/dharmik2003/poster_movie/blob/main/New%20folder/b7.png?raw=true", review: 15, price: 150, rating: 4 },
    { id: 6, title: "Tandoori Zinger Burger", image: "https://github.com/dharmik2003/poster_movie/blob/main/New%20folder/p3.png?raw=true", review: 5, price: 500, rating: 2 },
    { id: 7, title: "Non Whopper Double Patty", image: "https://github.com/dharmik2003/poster_movie/blob/main/New%20folder/b9.png?raw=true", review: 16, price: 200, rating: 1 },
    { id: 8, title: "Chicken Burger", image: "https://github.com/dharmik2003/poster_movie/blob/main/New%20folder/KFC-Burger-Transparent-Background-PNG.png?raw=true", review: 6, price: 299, rating: 3 },
    { id: 9, title: "Chicken Whopper", image: "https://github.com/dharmik2003/poster_movie/blob/main/New%20folder/n1.png?raw=true", review: 6, price: 199, rating: 3 },
];
