import {
  VizPanel,
  NestedScene,
  SceneTimePicker,
  SceneFlexLayout,
  SceneTimeRange,
  EmbeddedScene,
} from '@grafana/scenes';

import { Scene } from '../components/Scene';
import { SceneEditManager } from '../editor/SceneEditManager';

import { getQueryRunnerWithRandomWalkQuery } from './queries';

export function getSceneWithRows(standalone: boolean): Scene | EmbeddedScene {
  const state = {
    title: 'Scene with rows',
    body: new SceneFlexLayout({
      direction: 'column',
      children: [
        new NestedScene({
          title: 'Overview',
          canCollapse: true,
          // size: { ySizing: 'content', xSizing: 'fill' },
          body: new SceneFlexLayout({
            direction: 'row',
            children: [
              new VizPanel({
                pluginId: 'timeseries',
                title: 'Fill height',
              }),
              new VizPanel({
                pluginId: 'timeseries',
                title: 'Fill height',
              }),
            ],
          }),
        }),
        new NestedScene({
          title: 'More server details',
          // size: { ySizing: 'content', xSizing: 'fill' },
          canCollapse: true,
          body: new SceneFlexLayout({
            direction: 'row',
            children: [
              new VizPanel({
                pluginId: 'timeseries',
                title: 'Fill height',
              }),
              new VizPanel({
                pluginId: 'timeseries',
                title: 'Fill height',
              }),
            ],
          }),
        }),
      ],
    }),
    $editor: new SceneEditManager({}),
    $timeRange: new SceneTimeRange(),
    $data: getQueryRunnerWithRandomWalkQuery(),
    actions: [new SceneTimePicker({})],
  };

  return standalone ? new Scene(state) : new EmbeddedScene(state);
}
