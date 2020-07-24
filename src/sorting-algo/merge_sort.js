export default function merge_sort_animations(arr){
let animations=[]
merge(arr,arr.slice(),animations,0,arr.length-1)
return animations
}

function merge(arr,auxArr,animations,startIndx,endIndx){   
    if (endIndx!==startIndx){
        let midIndx=Math.floor((startIndx+endIndx)/2)             
        merge(auxArr,arr,animations,startIndx,midIndx)
        merge(auxArr,arr,animations,midIndx+1,endIndx)
        let i=startIndx,j=midIndx+1,k=startIndx
        while(i<=midIndx && j<=endIndx){
            animations.push([i,j])
            if (auxArr[i]>auxArr[j]){
                arr[k]=auxArr[i]
                animations.push([k,auxArr[i]])
                animations.push([i,j])
                i++
            } 
            else {
                arr[k]=auxArr[j]
                animations.push([k,auxArr[j]])
                animations.push([i,j])
                j++
            }
            k++
        }
        while (i<=midIndx){
            arr[k]=auxArr[i]
            animations.push([i,i])
            animations.push([k,auxArr[i]])
            animations.push([i,i])
            i++
            k++
        }
        while (j<=endIndx){
            arr[k]=auxArr[j]
            animations.push([j,j])
            animations.push([j,auxArr[j]])
            animations.push([j,j])
            j++ 
            k++
        }
    }
}

