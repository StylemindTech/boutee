const userJewellers = new Proxy({"src":"/_astro/Jewellers-avtar.wprqvbKZ.png","width":112,"height":40,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/billy/boutee/src/assets/Image/Jewellers-avtar.png";
							}
							
							return target[name];
						}
					});

export { userJewellers as u };
