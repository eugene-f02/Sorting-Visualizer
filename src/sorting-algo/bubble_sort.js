import swap from '../misc/swap_func.js'

export default function bubble_sort_animations(arr){
    let animations=[]
    let sorted=false
    while(sorted===false){
        sorted=true
        for (let i=0;i<arr.length-1;i++){
            if (arr[i]<arr[i+1]){
                swap(arr,i,i+1,animations)
                sorted=false
            }
        }
    }
    return animations
}