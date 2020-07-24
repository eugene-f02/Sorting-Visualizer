import swap from '../misc/swap_func.js'

export default function quick_sort_animations(arr){
    let animations=[]
    quick_sort(arr,0,arr.length-1,animations)
    return animations
}

function quick_sort(arr,startIndx,ednIndx,animations){
    if (startIndx<ednIndx){
        let pIndex=partition(arr,startIndx,ednIndx,animations)
        quick_sort(arr,startIndx,pIndex-1,animations)
        quick_sort(arr,pIndex+1,ednIndx,animations)
    }
}

function partition(arr,startIndx,ednIndx,animations){
    let pivot=arr[ednIndx]
    let pIndex=startIndx
    for (let i=startIndx;i<=ednIndx-1;i++){
        if (arr[i]>pivot){
            swap(arr,i,pIndex,animations)
            pIndex++
        }
    }
    swap(arr,pIndex,ednIndx,animations)
    return pIndex
}