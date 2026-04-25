# Notes

The public IP from the NodePort that exposes it to the exterior is not a general IP address from the computers network, but a public IP from the Linux VM on which Kubernetes runs, which means it it not directly accessible.

In order to make it accessible, we need to run the following commands:

```sh
kubectl port-forward svc/vote 31000:80
kubectl port-forward svc/result 31001:80
```

## More

In this example, we deploy pods directly, which is not the best way to manage our system. We might prefer to use, for example Deployment, which use ReplicaSet, for Pod replication and automated scaling.

## Commands:

- Start/apply all the definitions:
```sh
kubectl apply -f .
```

- Remove/stop all the definitions:
```sh
kubectl delete -f .
```

