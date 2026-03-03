/* Audio Service - wrapper around the browsers mediaRecorder API
Used by the VoiceInput component to record farmers speech */

class AudioService{
    constructor(){
        this.mediaRecorder = null;
        this.chunks=[];
        this.stream=null;
    }

    /* start recording from the microphone */
    async start() {
        this.chunks=[];
        this.stream= await navigator.mediaDevices.getUserMedia({audio : true});

        const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
           ? "audio/webm;codecs=opus" : "audio/wav";
        
        this.mediaRecorder= new MediaRecorder(this.stream, {mimeType});
        this.mediaRecorder.ondataavailable=(e)=>{
            if(e.data.size > 0) this.chunks.push(e.data);
        };
        this.mediaRecorder.start(100);
    }

    /* Stop recording and return the audio as a blob */
    stop(){
        return new Promise((resolve)=>{
            this.mediaRecorder.onstop=()=>{
                const blob = new Blob(this.chunks, {
                    type:this.mediaRecorder.mimeType,
                });
                this.stream.getTracks().forEach(t =>t.stop()) // Release mic
                resolve(blob);
            };
            this.mediaRecorder.stop();
        });
    }

    isRecording(){
        return this.mediaRecorder?.state==="recording";
    }
}

export default new AudioService();