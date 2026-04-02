# MQTT Topics

## Température

Topic :

```text id="tempmqtt1"
scada/temperature
```

Exemple de message :

```json id="tempmqtt2"
{
  "sensorId": "temp-01",
  "value": 27,
  "unit": "C",
  "timestamp": "2026-04-01T20:30:00Z"
}
```

## Fumée

Topic :

```text id="smokemqtt1"
scada/smoke
```

Exemple de message :

```json id="smokemqtt2"
{
  "sensorId": "smoke-01",
  "value": 5,
  "timestamp": "2026-04-01T20:31:00Z"
}
```

## Mouvement

Topic :

```text id="motionmqtt1"
scada/motion
```

Exemple de message :

```json id="motionmqtt2"
{
  "sensorId": "motion-01",
  "detected": true,
  "timestamp": "2026-04-01T20:32:00Z"
}
```

## Porte

Topic :

```text id="doormqtt1"
scada/door
```

Exemple de message :

```json id="doormqtt2"
{
  "sensorId": "door-01",
  "status": "open",
  "authorized": false,
  "timestamp": "2026-04-01T20:33:00Z"
}
```

## Ventilation

Topic :

```text id="ventmqtt1"
scada/ventilation
```

Exemple de message :

```json id="ventmqtt2"
{
  "systemId": "vent-01",
  "status": "active",
  "timestamp": "2026-04-01T20:34:00Z"
}
```
