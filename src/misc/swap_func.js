export default function swap(arr,i,k,animations){
    let temp=arr[i]
    arr[i]=arr[k]
    arr[k]=temp
    animations.push([i,k])
    animations.push([i,k])
    animations.push([i,k])
}