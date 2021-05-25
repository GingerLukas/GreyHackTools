export interface IMonoModule {
    mono_bind_static_method(methodLocation: string): () => any;
}