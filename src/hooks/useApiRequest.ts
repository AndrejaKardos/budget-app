import { useCallback, useState } from 'react'
import { ApiStatus } from '../utils/api'

type ApiRequest<TRequest, TResponse> = (req: TRequest) => Promise<TResponse>

const useApiRequest = <TRequest, TResponse>(sendRequest: ApiRequest<TRequest, TResponse>) => {
    const [requestState, setRequestState] = useState<ApiStatus>(ApiStatus.OK);

    const send = useCallback((request: TRequest) => {
        setRequestState(ApiStatus.LOADING)
        return sendRequest(request).then(r => {
            setRequestState(ApiStatus.OK);
            return r;
        })
    }, [setRequestState, sendRequest])

    return {
        send,
        isOk: requestState === ApiStatus.OK,
        isLoading: requestState === ApiStatus.LOADING,
        hasFailed: requestState === ApiStatus.FAILED
    }
}

export default useApiRequest;
