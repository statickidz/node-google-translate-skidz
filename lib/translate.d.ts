declare type CB = (data: Response) => void
declare type Args = {
    text: string,
    source: string,
    target: string
}
declare type Sentence = {
    trans: string,
    orig: string,
    backend: number,
    model_specification: any,
    translation_engine_debug_info: any
}
declare type Response = {
    sentences: Sentence[],
    src: string,
    confidence: number,
    spell: object,
    ld_result: {
        srclangs: [],
        srclangs_confidences: number[],
        extended_srclangs: []
    },
    translation: string
}
export default function translate(args: Args, callback?: CB): Promise<Response>;
