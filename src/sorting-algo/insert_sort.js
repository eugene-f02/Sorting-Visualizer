import swap from '../misc/swap_func.js'

export default function insertion_sort_animations(arr){
    let animations=[]
    for (let i=1;i<arr.length;i++){
        let j=i
        while (j>0 && arr[j]>arr[j-1]){
            swap(arr,j-1,j,animations)
            j--
        }
    }
    return animations
}