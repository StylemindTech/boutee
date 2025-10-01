const cardImg = new Proxy({"src":"/_astro/card-img1.DdHVBLhD.png","width":1600,"height":1600,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/billy/boutee/src/assets/Image/card-img1.png";
							}
							
							return target[name];
						}
					});

const cardImg1 = new Proxy({"src":"/_astro/card-img2.Dz6mqHKX.png","width":1600,"height":1600,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/billy/boutee/src/assets/Image/card-img2.png";
							}
							
							return target[name];
						}
					});

const cardImg2 = new Proxy({"src":"/_astro/card-img3.BP_NWOTA.png","width":1600,"height":1600,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/billy/boutee/src/assets/Image/card-img3.png";
							}
							
							return target[name];
						}
					});

export { cardImg1 as a, cardImg2 as b, cardImg as c };
