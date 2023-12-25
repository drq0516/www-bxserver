﻿javascript: if (window.location.href.indexOf("miyoushe.com") > -1) { loadScript() } else { if (window.confirm('书签需要在米游社页面执行，是否前往？')) { window.location.href = "https://www.miyoushe.com/ys/" } } function loadScript() { var script = document.createElement('script'); script.type = 'text/javascript'; if (script.readyState) { script.onreadystatechange = function () { if (script.readyState === 'loaded' || script.readyState === 'complete') { script.onreadystatechange = null; upload() } } } else { script.onload = function () { upload() } } script.src = 'https://cdn.staticfile.org/blueimp-md5/2.19.0/js/md5.min.js'; document.body.append(script) } function upload() { this.getUserInfo().then(result => { if (result.retcode !== 0) { alert("用户信息获取失败\\n请确认已登录并刷新当前页面"); return } let userInfoList = result.data.list; let uid = ''; switch (userInfoList.length) { case 0: alert("暂无原神角色信息\\n渠道服请绑定后重试"); return; case 1: uid = userInfoList[0].game_uid; if (!window.confirm('提交 [UID:' + uid + '] 数据？')) { return } break; default: let uidList = userInfoList.map(u => u.game_uid); uid = prompt('输入在 [' + uidList.join('|') + '] 之中你想提交的角色 UID'); if (!uidList.includes(uid)) { alert("输入的 UID 不在你的账号列表内，请重试"); return } break }let userInfo = userInfoList.filter(u => u.game_uid === uid)[0]; userInfo.cookie_id = md5(document.cookie); Promise.all([this.getAbyss(userInfo, 1), this.getCharacter(userInfo)]).then(result => { if (result[0].retcode !== 0 || result[1].retcode !== 0) { alert("深渊挑战信息获取失败\\n请确认已登录并刷新当前页面"); return } let abyss = result[0].data; let character = result[1].data.avatars; this.saveData(abyss, character, userInfo, 1).then(json => alert(json.message)).catch(() => alert('请求错误')) }) }).catch(reason => alert("用户信息获取失败\\n请确认已登录并刷新当前页面\\n错误提示：" + JSON.stringify(reason))) } function getUserInfo() { return new Promise((resolve, reject) => { let url = 'https://api-takumi.miyoushe.com/binding/api/getUserGameRolesByCookie?'; let query = "game_biz=hk4e_cn"; fetch(url + query, { method: 'GET', credentials: 'include', headers: this.getHeaders("/ys", "", query), }).then(res => res.json()).then(json => resolve(json)).catch((e) => reject(e)) }) } function getAbyss(userInfo, scheduleType) { return new Promise((resolve, reject) => { let url = 'https://api-takumi.miyoushe.com/game_record/app/genshin/api/spiralAbyss?'; let query = "role_id=" + userInfo.game_uid + "&schedule_type=" + scheduleType + "&server=" + userInfo.region; fetch(url + query, { method: 'GET', credentials: 'include', headers: this.getHeaders("/ys/deep/", "", query), }).then(res => res.json()).then(json => resolve(json)).catch((e) => reject(e)) }) } function getCharacter(userInfo) { return new Promise((resolve, reject) => { let url = 'https://api-takumi.miyoushe.com/game_record/app/genshin/api/character'; let body = JSON.stringify({ role_id: userInfo.game_uid, server: userInfo.region, }); fetch(url, { method: 'POST', credentials: 'include', headers: this.getHeaders("/ys/role/all", body, ""), body: body }).then(res => res.json()).then(json => resolve(json)).catch((e) => reject(e)) }) } function saveData(abyss, character, userInfo, scheduleType) { return new Promise((resolve, reject) => { let url = 'https://homa.snapgenshin.com/Record/Upload'; fetch(url, { method: 'POST', headers: { 'User-Agent': 'Snap Hutao/Bookmark', 'Content-Type': 'application/json;charset=utf-8' }, body: JSON.stringify({ Uid: userInfo.game_uid, Identity: "Snap Hutao Bookmark", SpiralAbyss: TransformSpiralAbyss(abyss), Avatars: TransformAvatar(character) }), }).then(res => res.json()).then(json => resolve(json)).catch((e) => reject(e)) }) } function getHeaders(rpcPage, body, query) { return { 'Accept': 'application/json, text/plain, */*', 'x-rpc-client_type': '5', 'Accept-Language': 'zh-CN,zh-Hans;q=0.9', 'Accept-Encoding': 'gzip, deflate, br', 'Content-Type': 'application/json;charset=utf-8', 'x-rpc-app_version': '2.36.1', 'DS': this.getDS(body, query), } } function getDS(body, query) { let salt = 'xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs'; let time = new Date().getTime().toString().substring(0, 10); let random = Math.floor(Math.random() * 900000 + 100000); let sign = md5("salt=" + salt + "&t=" + time + "&r=" + random + "&b=" + body + "&q=" + query); return time + "," + random + "," + sign } function TransformAvatar(avatars) { var res = []; for (var el of avatars) { var payload = { AvatarId: el.id, WeaponId: el.weapon.id, ReliquarySetIds: el.reliquaries.map(rel => rel.set.id), ActivedvarellationNumber: el.actived_varellation_num, }; res.push(payload) } return res } function TransformSpiralAbyss(data) { var SpiralAbyss = {}; SpiralAbyss.ScheduleId = data.schedule_id; SpiralAbyss.TotalBattleTimes = data.total_battle_times; SpiralAbyss.TotalWinTimes = data.total_win_times; SpiralAbyss.Damage = { AvatarId: data.damage_rank[0].avatar_id, Value: data.damage_rank[0].value, }; SpiralAbyss.TakeDamage = { AvatarId: data.take_damage_rank[0].avatar_id, Value: data.take_damage_rank[0].value, }; SpiralAbyss.Floors = data.floors.map(el => ({ Index: el.index, Star: el.star, Levels: el.levels.map(lel => ({ Index: lel.index, Star: lel.star, Battles: lel.battles.map(bel => ({ Index: bel.index, Avatars: bel.avatars.map(ael => ael.id), })) })), })); return SpiralAbyss }