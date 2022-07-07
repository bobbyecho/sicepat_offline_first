import { RecoilValue, RecoilState, useRecoilCallback } from 'recoil';

interface Nexus {
    get?: <T>(recoilValue: RecoilValue<T>) => T
    getPromise?: <T>(recoilValue: RecoilValue<T>) => Promise<T>
    set?: <T>(recoilState: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) => void
    reset?: (recoilState: RecoilState<any>) => void
}

const nexus: Nexus = {}

export default function RecoilNexus() {

    nexus.get = useRecoilCallback<[recoilValue: RecoilValue<any>], any>(({ snapshot }) =>
        function <T>(recoilValue: RecoilValue<T>) {
            return snapshot.getLoadable(recoilValue).contents
        }, [])

    nexus.getPromise = useRecoilCallback<[recoilValue: RecoilValue<any>], Promise<any>>(({ snapshot }) =>
        function <T>(recoilValue: RecoilValue<T>) {
            return snapshot.getPromise(recoilValue)
        }, [])

    nexus.set = useRecoilCallback<[recoilState: RecoilState<any>, valOrUpdater: any | ((currVal: any) => any)], any>(({ snapshot, gotoSnapshot }) =>
        function <T>(recoilState: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) {
            const newSnapshot = snapshot.map(mutable => {
                mutable.set(recoilState, valOrUpdater)
            })
    
            gotoSnapshot(newSnapshot)
        }, [])

    nexus.reset = useRecoilCallback(({ reset }) => reset, [])

    return null
}

export function getRecoil<T>(recoilValue: RecoilValue<T>): T {
    return nexus.get!(recoilValue)
}

export function getRecoilPromise<T>(recoilValue: RecoilValue<T>): Promise<T> {
    return nexus.getPromise!(recoilValue)
}

export function setRecoil<T>(recoilState: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) {
    nexus.set!(recoilState, valOrUpdater)
}

export function resetRecoil(recoilState: RecoilState<any>) {
    nexus.reset!(recoilState)
}