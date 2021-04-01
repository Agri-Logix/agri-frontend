/*
 * Extra typings definitions
 */

// Allow .json files imports
declare module '*.json';
declare module 'visual-heatmap';
// SystemJS module definition
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
