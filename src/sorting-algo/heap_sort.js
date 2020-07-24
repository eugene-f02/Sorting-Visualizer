import swap from '../misc/swap_func.js'

export default function heap_sort_animations(arr){
    let animations=[]
    let n=arr.length
    for (let i=Math.floor(n/2)-1;i>=0;i--){
        heapify(arr,n,i,animations)
    }
    for (let i=n-1;i>0;i--) 
    {
        swap(arr,0,i,animations)
        heapify(arr,i,0,animations)
    }
    return animations
}

function heapify(arr,n,i,animations){
    let smallest=i
    let l=2*i+1
    let r=2*i+2
    if (l < n && arr[l] < arr[smallest]) smallest = l
    if (r < n && arr[r] < arr[smallest]) smallest = r
    if (smallest !== i) { 
        swap(arr,i,smallest,animations)
        heapify(arr, n, smallest,animations)
    } 
}
