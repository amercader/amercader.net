---
title: "TIL (the hard way): Alpine Linux does not ship Bash by default"
description: "Death to obscure error messages"
images:
- /img/blog/alpine-bash.png
date: 2022-11-28
draft: false
---

This is a bit embarrassing but I'll post it anyway in case it helps somebody out there having a slow day (or myself from the future who might forget it).

I was recently upgrading a [Dockerfile](https://github.com/okfn/docker-ckan/blob/master/ckan-base/2.10/Dockerfile) from [Alpine Linux](https://www.alpinelinux.org/) version 3.13 to version 3.16. The Dockerfile is fairly straightforward, installing a bunch of system packages, then Python ones and copying some initialization scripts. One of these scripts is the entrypoint script defined in `CMD`:

```docker
FROM alpine:3.16

ENV APP_DIR=/srv/app

# ...

COPY start_ckan.sh ${APP_DIR}

CMD ["/srv/app/start_ckan.sh"]
```

I updated the Alpine version and the image built fine. But when I tried to run the image, I got the following:

```shell
exec /srv/app/start_ckan.sh: no such file or directory
```

Now, this was the crucial moment when my brain, in all its innocence, interpreted the following: "I'm seeing a file path, and next to it a message telling me this file does not exist. That is the problem."

That sent me on a doomed debugging path trying to find a problem when copying the file to the image, file permissions, spellings... I even extracted the container contents with `docker extract` and saw the `start_ckan.sh` file there, mocking me.

Until I stepped back, decided to check the actual script file and then I saw it right there, in the first line:

```bash
#!/bin/bash

...
```

Could it be? I quickly googled "alpine bash" and indeed there it was: Alpine linux doesn't include bash by default. The error message was telling me that `/bin/bash` was not found, not the `start_ckan.sh` script.

Why did this happen in this particular Alpine version? Probably one of the system packages that were installed in the previous version had bash as a requirement but that changed in the latest Alpine version and it was not automatically installed anymore.

Oh well. Meaningful error messages matter folks!
